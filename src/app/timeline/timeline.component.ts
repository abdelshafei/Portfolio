import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  /** 0..100 — how much of the spine is "committed" (filled) */
  fillPercent = signal(0);
  /** how many entries the fill line has reached */
  litCount = signal(0);

  @ViewChild('timelineEl') timelineEl?: ElementRef<HTMLDivElement>;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser || !this.timelineEl) return;

    const el = this.timelineEl.nativeElement;
    const rect = el.getBoundingClientRect();

    // The fill line chases a probe point slightly above the middle of the viewport.
    const probe = window.innerHeight * 0.55;
    const progress = Math.max(0, Math.min(1, (probe - rect.top) / rect.height));
    this.fillPercent.set(progress * 100);

    // An entry "commits" (lights up) once the fill passes its node.
    const fillPx = progress * rect.height;
    const items = el.querySelectorAll<HTMLElement>('.timeline-item');
    let lit = 0;
    items.forEach((item, index) => {
      if (item.offsetTop + 46 <= fillPx) lit = index + 1;
    });
    this.litCount.set(lit);
  }

  events = [
    {
      status: 'Studying at Carleton University',
      date: 'Sep 2022',
      hash: '4c07aa9',
      commit: 'init: enrolled in CS @ Carleton',
      description: `
      Studying Computer Science with a specialization in Artificial Intelligence and Machine Learning at Carleton University, I've spent the past three years immersing myself in both foundational and advanced topics. I'm currently in my final year and expect to graduate in May 2027.
      `,
      icon: 'fa-solid fa-graduation-cap'
    },
    {
      status: 'Undergraduate Teaching Assistant',
      date: 'Jan 2025',
      hash: 'e8b21f3',
      commit: 'feat(teaching): TA for COMP2404',
      description: `
      From January to April 2025, I assisted Dr. Darryl Hill in teaching COMP2404: Introduction to Software Engineering. I led weekly tutorials and office hours, helping students strengthen their understanding of C++ concepts like object-oriented programming and data structures, while also supporting assignment guidance and troubleshooting.
      `,
      icon: 'fa-solid fa-chalkboard-user'
    },
    {
      status: 'Front End Software Developer Intern',
      date: 'Sep 2025',
      hash: '9b81e02',
      commit: 'feat(frontend): intern @ Ribbon',
      description: `
      Advanced the capabilities of Ribbon Communications' Analytics Platform by delivering production-grade features, optimizing performance paths, and resolving complex bugs tied to real-time data visualization; contributing to a more resilient, intuitive, and high-performing product.
      `,
      icon: 'fa-solid fa-code'
    },
    {
      status: 'Systems Software Developer Intern',
      date: 'Jan 2026',
      hash: 'a3f2c1d',
      commit: 'feat(systems): distributed messaging @ Solace',
      description: `
      Engineering the distributed layer of the message spool — the guaranteed-messaging engine at the core of Solace's PubSub+ Event Broker. Evolving how events are persisted and replicated across nodes, and hardening a subsystem trusted to move mission-critical data reliably and at scale.
      `,
      icon: 'fa-solid fa-gear'
    }
  ];
}
