import { Component, HostListener } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { NgIf, NgClass } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [HomeComponent, NavComponent, TimelineComponent, ProjectsComponent, AboutComponent, ContactFormComponent, NgIf, NgClass],
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
}

