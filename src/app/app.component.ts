import { Component, HostListener } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [HomeComponent, NavComponent, TimelineComponent, ProjectsComponent, AboutComponent, ContactFormComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  Year = new Date().getFullYear();

  openContact: boolean = false;
  isHovered: boolean = false;

  openForm() {
    this.openContact = true;
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
}

