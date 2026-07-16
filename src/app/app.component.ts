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
  private mouse = { x: -100, y: -100, lastMoveAt: 0, inWindow: false, down: false, overInteractive: false };
  private bubble = { x: -100, y: -100, vx: 0, vy: 0, pressScale: 1, hoverScale: 1, buoy: 0 };
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
      this.mouse.overInteractive = !!target?.closest('a, button, input, textarea, [role="button"], .hover, app-project-card, app-skill-icon');
    });
  }

  private updateBubble(time: number, dt: number): void {
    if (!this.bubbleEnabled || !this.bubbleCursor) return;

    const b = this.bubble;
    const m = this.mouse;

    // --- Spring-damper follow: the bubble is dragged through "water" toward the pointer
    const stiffness = 170;
    const damping = 16;
    b.vx += ((m.x - b.x) * stiffness - b.vx * damping) * dt;
    b.vy += ((m.y - b.y) * stiffness - b.vy * damping) * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    // --- Buoyancy: after a moment of stillness, the bubble gently floats upward and bobs
    const idle = (performance.now() - m.lastMoveAt) / 1000;
    const targetBuoy = idle > 1.1 ? Math.min((idle - 1.1) * 9, 20) : 0;
    b.buoy += (targetBuoy - b.buoy) * 2.5 * dt;
    const bob = b.buoy > 0.5 ? Math.sin(time / 620) * 2.6 : 0;
    const sway = b.buoy > 0.5 ? Math.sin(time / 900) * 2 : 0;

    // --- Press squish + hover grow (both smoothed like tiny springs)
    const pressTarget = m.down ? 0.72 : 1;
    b.pressScale += (pressTarget - b.pressScale) * 14 * dt;
    const hoverTarget = m.overInteractive ? 1.55 : 1;
    b.hoverScale += (hoverTarget - b.hoverScale) * 10 * dt;

    // --- Velocity deformation: stretch along the direction of travel, squash across it
    const speed = Math.hypot(b.vx, b.vy);
    const stretch = 1 + Math.min(speed / 1500, 0.42);
    const squash = 1 / stretch;
    const angle = speed > 20 ? Math.atan2(b.vy, b.vx) : 0;

    // --- Idle wobble: a soft, slow shape oscillation like surface tension settling
    const wobble = speed < 60 ? 1 + Math.sin(time / 300) * 0.025 : 1;

    const base = b.pressScale * b.hoverScale;
    const el = this.bubbleCursor.nativeElement;
    const half = 14;

    el.style.opacity = m.inWindow ? '1' : '0';
    el.style.transform =
      `translate(${(b.x + sway - half).toFixed(2)}px, ${(b.y - b.buoy + bob - half).toFixed(2)}px) ` +
      `rotate(${angle}rad) scale(${(stretch * base * wobble).toFixed(3)}, ${(squash * base * (2 - wobble)).toFixed(3)})`;

    // keep the highlight upright while the bubble rotates with its velocity
    const inner = el.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transform = `rotate(${-angle}rad)`;
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
