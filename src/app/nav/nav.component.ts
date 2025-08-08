import { Component, Inject, PLATFORM_ID, HostListener, OnInit, ViewChild } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, MatTooltip],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menuOpen = signal(false);
  isMobile = signal(false);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.isMobile.set(window.innerWidth <= 500);
    }
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.isMobile.set(window.innerWidth <= 500);
      if (!this.isMobile()) {
        this.menuOpen.set(false); // When not mobile its set to 
      }
    }
  }

  lastScrollTop = 0;
  navHidden = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      // Scrolling down
      this.navHidden = true;
    } else {
      // Scrolling up
      this.navHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  @ViewChild(MatTooltip) tooltip!: MatTooltip;
  onHover(tooltip: MatTooltip) {
    tooltip.show();

    setTimeout(() => {
      tooltip.hide();
    }, 800);
  }

}