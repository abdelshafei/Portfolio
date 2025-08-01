import { Component, Inject, PLATFORM_ID, HostListener, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
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
      this.isMobile.set(window.innerWidth <= 800);
    }
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.isMobile.set(window.innerWidth <= 800);
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

    if (currentScroll > this.lastScrollTop && currentScroll > 300) {
      // Scrolling down
      this.navHidden = true;
    } else {
      // Scrolling up
      this.navHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}