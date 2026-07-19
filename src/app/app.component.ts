import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, ElementRef, HostListener, signal, NgZone } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { NgIf, isPlatformBrowser } from '@angular/common';

interface Star {
  x: number;
  y: number;
  radius: number;
  depth: number;     // 0 (far) -> 1 (near); drives parallax + brightness
  twinkle: number;   // phase offset for the twinkle animation
  speed: number;     // slow horizontal drift
}

@Component({
  selector: 'app-root',
  imports: [HomeComponent, NavComponent, TimelineComponent, ProjectsComponent, AboutComponent, ContactFormComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('starCanvas') starCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('bubbleCursor') bubbleCursor?: ElementRef<HTMLDivElement>;

  Year = new Date().getFullYear();
  openContact = false;
  isHovered = false;
  scrollProgress = signal(0);

  private isBrowser: boolean;
  private ctx: CanvasRenderingContext2D | null = null;
  private stars: Star[] = [];
  private shootingStar: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
  private pointer = { x: 0.5, y: 0.5 };
  private animationId = 0;
  private reducedMotion = false;

  /* ---------- Bubble cursor state ---------- */
  private bubbleEnabled = false;
  private mouse = { x: -100, y: -100, lastMoveAt: 0, inWindow: false, down: false, overInteractive: false, overText: false };
  private bubble = {
    x: -100, y: -100, vx: 0, vy: 0,
    pressScale: 1, hoverScale: 1, buoy: 0,
    dx: 0, dy: 0, dvx: 0, dvy: 0,  // deformation as a springy 2D vector
    angle: 0                        // orientation derived from the vector
  };
  private trailCount = 0;
  private lastTrailAt = 0;
  private lastFrameTime = 0;
  private removeListeners: Array<() => void> = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.starCanvas) return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = this.starCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resizeCanvas();
    this.seedStars();
    this.setupBubbleCursor();

    // Run the render loop outside Angular so it never triggers change detection.
    this.zone.runOutsideAngular(() => {
      const loop = (time: number) => {
        const dt = this.lastFrameTime ? Math.min((time - this.lastFrameTime) / 1000, 0.05) : 0.016;
        this.lastFrameTime = time;

        this.drawFrame(time);
        this.updateBubble(time, dt);

        this.animationId = requestAnimationFrame(loop);
      };
      this.animationId = requestAnimationFrame(loop);
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      if (this.animationId) cancelAnimationFrame(this.animationId);
      this.removeListeners.forEach(remove => remove());
      document.body.classList.remove('bubble-active');
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) return;
    this.resizeCanvas();
    this.seedStars();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    this.pointer.x = event.clientX / window.innerWidth;
    this.pointer.y = event.clientY / window.innerHeight;

    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
    this.mouse.lastMoveAt = performance.now();
    this.mouse.inWindow = true;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress.set(max > 0 ? (doc.scrollTop / max) * 100 : 0);
  }

  /* ================= Bubble cursor ================= */

  private setupBubbleCursor(): void {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer || this.reducedMotion || !this.bubbleCursor) return;

    this.bubbleEnabled = true;
    document.body.classList.add('bubble-active');

    const on = <K extends keyof DocumentEventMap>(type: K, handler: (e: DocumentEventMap[K]) => void) => {
      document.addEventListener(type, handler as EventListener, { passive: true });
      this.removeListeners.push(() => document.removeEventListener(type, handler as EventListener));
    };

    on('mousedown', () => (this.mouse.down = true));
    on('mouseup', () => (this.mouse.down = false));
    on('mouseleave', () => (this.mouse.inWindow = false));
    on('mouseenter', () => (this.mouse.inWindow = true));
    on('mouseover', (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Over the About-me letters the bubble condenses to a dot instead of growing.
      this.mouse.overText = !!target?.closest('app-letter');
      this.mouse.overInteractive = !this.mouse.overText &&
        !!target?.closest('a, button, input, textarea, [role="button"], app-project-card, app-skill-icon');
    });
  }

  private updateBubble(time: number, dt: number): void {
    if (!this.bubbleEnabled || !this.bubbleCursor) return;

    const b = this.bubble;
    const m = this.mouse;

    // --- Spring-damper follow: near-critically damped so the bubble glides to
    //     a halt without rubber-banding past the pointer on sudden stops
    const stiffness = 200;
    const damping = 25;
    b.vx += ((m.x - b.x) * stiffness - b.vx * damping) * dt;
    b.vy += ((m.y - b.y) * stiffness - b.vy * damping) * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    const speed = Math.hypot(b.vx, b.vy);

    // --- Jelly deformation as a 2D vector spring. The target points along the
    //     current velocity; on a direction reversal the vector passes through
    //     zero — the bulge flattens out and regrows on the new trailing side,
    //     instead of rotating through the bottom.
    const mag = Math.min(speed / 1100, 0.45);
    const tx = speed > 1 ? (b.vx / speed) * mag : 0;
    const ty = speed > 1 ? (b.vy / speed) * mag : 0;
    const dk = 130;   // deform spring stiffness
    const dd = 18;    // close to critical damping (~22.8) -> gentle settle
    b.dvx += ((tx - b.dx) * dk - b.dvx * dd) * dt;
    b.dvy += ((ty - b.dy) * dk - b.dvy * dd) * dt;
    b.dx += b.dvx * dt;
    b.dy += b.dvy * dt;

    const deform = Math.min(Math.hypot(b.dx, b.dy), 0.5);
    if (deform > 0.015) {
      b.angle = Math.atan2(b.dy, b.dx); // orientation comes straight from the vector
    }

    // stretch along the deformation axis, squash across it (area preserved)
    const stretch = 1 + deform * 0.65;
    const squash = 1 / stretch;

    // --- Buoyancy: after a moment of stillness, the bubble gently floats upward and bobs
    const idle = (performance.now() - m.lastMoveAt) / 1000;
    const targetBuoy = idle > 1.1 ? Math.min((idle - 1.1) * 9, 22) : 0;
    b.buoy += (targetBuoy - b.buoy) * 2.5 * dt;
    const bob = b.buoy > 0.5 ? Math.sin(time / 620) * 2.6 : 0;
    const sway = b.buoy > 0.5 ? Math.sin(time / 900) * 2 : 0;

    // --- Press squish + hover grow/shrink (smoothed like tiny springs).
    //     Over the about-me letters the bubble condenses to a small dot so
    //     the letters being hovered stay clearly visible.
    const pressTarget = m.down ? 0.7 : 1;
    b.pressScale += (pressTarget - b.pressScale) * 14 * dt;
    const hoverTarget = m.overText ? 0.38 : (m.overInteractive ? 1.45 : 1);
    b.hoverScale += (hoverTarget - b.hoverScale) * 12 * dt;

    // --- Idle breathing: slow soft pulse when resting
    const breathe = speed < 60 ? 1 + Math.sin(time / 800) * 0.03 : 1;

    const base = b.pressScale * b.hoverScale * breathe;
    const el = this.bubbleCursor.nativeElement;
    const half = 20;

    el.style.opacity = m.inWindow ? '1' : '0';
    el.classList.toggle('dot-mode', m.overText);
    el.style.transform =
      `translate(${(b.x + sway - half).toFixed(2)}px, ${(b.y - b.buoy + bob - half).toFixed(2)}px) ` +
      `rotate(${b.angle}rad) scale(${(stretch * base).toFixed(3)}, ${(squash * base).toFixed(3)})`;

    // --- Asymmetric bulge: a bubble pushed through fluid flattens at its
    //     leading face and bulges at the rear. The element is rotated so +x
    //     is the direction of travel: shrink the front radii, grow the rear.
    //     deformVel adds a slight vertical shimmer while the jelly settles.
    const d = deform;
    const front = Math.max(50 - d * 16, 38);
    const rear = Math.min(50 + d * 9, 57);
    // shimmer follows how fast the deformation is changing along its own axis
    const deformRate = b.dvx * Math.cos(b.angle) + b.dvy * Math.sin(b.angle);
    const shimmer = Math.max(Math.min(deformRate * 4, 4.5), -4.5);
    const inner = el.firstElementChild as HTMLElement | null;
    if (inner) {
      inner.style.borderRadius =
        `${rear}% ${front}% ${front}% ${rear}% / ` +
        `${50 + shimmer}% ${50 - shimmer}% ${50 + shimmer}% ${50 - shimmer}%`;
    }

    // --- Trail: fast movement sheds tiny bubbles that float up and pop
    if (speed > 550 && time - this.lastTrailAt > 70 && this.trailCount < 10) {
      this.lastTrailAt = time;
      this.spawnTrailBubble(b.x, b.y);
    }
  }

  private spawnTrailBubble(x: number, y: number): void {
    const dot = document.createElement('div');
    dot.className = 'bubble-trail';
    const size = 4 + Math.random() * 7;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${x + (Math.random() - 0.5) * 18}px`;
    dot.style.top = `${y + (Math.random() - 0.5) * 18}px`;
    document.body.appendChild(dot);
    this.trailCount++;
    setTimeout(() => {
      dot.remove();
      this.trailCount--;
    }, 750);
  }

  /* ================= Starfield ================= */

  private resizeCanvas(): void {
    const canvas = this.starCanvas!.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private seedStars(): void {
    const canvas = this.starCanvas!.nativeElement;
    const count = Math.min(220, Math.floor((canvas.width * canvas.height) / 6500));
    this.stars = Array.from({ length: count }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.4 + depth * 1.4,
        depth,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.02 + depth * 0.05
      };
    });
  }

  private drawFrame(time: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const canvas = this.starCanvas!.nativeElement;
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    const offsetX = (this.pointer.x - 0.5) * 30;
    const offsetY = (this.pointer.y - 0.5) * 30;

    for (const star of this.stars) {
      if (!this.reducedMotion) {
        star.x += star.speed;
        if (star.x > width + 4) star.x = -4;
      }

      const px = star.x + offsetX * star.depth;
      const py = star.y + offsetY * star.depth;
      const twinkle = this.reducedMotion ? 0.75 : 0.55 + 0.45 * Math.sin(time / 900 + star.twinkle);
      const alpha = (0.25 + star.depth * 0.65) * twinkle;

      ctx.beginPath();
      ctx.arc(px, py, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(214, 238, 255, ${alpha.toFixed(3)})`;
      ctx.fill();
    }

    if (!this.reducedMotion) {
      this.drawShootingStar(ctx, width, height);
    }
  }

  private drawShootingStar(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Occasionally launch a shooting star.
    if (!this.shootingStar && Math.random() < 0.0035) {
      this.shootingStar = {
        x: Math.random() * width * 0.7 + width * 0.15,
        y: Math.random() * height * 0.3,
        vx: 6 + Math.random() * 4,
        vy: 2.5 + Math.random() * 2,
        life: 1
      };
    }

    const s = this.shootingStar;
    if (!s) return;

    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.018;

    if (s.life <= 0 || s.x > width + 120 || s.y > height + 120) {
      this.shootingStar = null;
      return;
    }

    const tail = 14;
    const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail);
    gradient.addColorStop(0, `rgba(244, 221, 124, ${0.9 * s.life})`);
    gradient.addColorStop(1, 'rgba(244, 221, 124, 0)');

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}
