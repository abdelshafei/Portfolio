import { Component, Inject, PLATFORM_ID, HostListener, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit, OnDestroy {
  sections = [
    { id: 'home',     label: 'Home',     icon: 'fa-solid fa-house' },
    { id: 'timeline', label: 'Timeline', icon: 'fa-solid fa-timeline' },
    { id: 'projects', label: 'Projects', icon: 'fa-solid fa-screwdriver-wrench' },
    { id: 'about',    label: 'About',    icon: 'fa-solid fa-comment-dots' }
  ];

  activeSection = signal('home');
  navHidden = false;

  private isBrowser: boolean;
  private lastScrollTop = 0;
  private sectionObserver?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') return;

    // Highlight the link of whichever section currently crosses the middle of the screen.
    this.sectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    for (const section of this.sections) {
      const el = document.getElementById(section.id);
      if (el) this.sectionObserver.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.isBrowser) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.navHidden = currentScroll > this.lastScrollTop; // hide when scrolling down
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
