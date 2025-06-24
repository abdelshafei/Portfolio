import { Component } from '@angular/core';
import { SkillsComponent } from '../skills/skills.component'
import { CoursesComponent } from '../courses/courses.component'

@Component({
  selector: 'app-about',
  imports: [SkillsComponent, CoursesComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  openContact: boolean = false;
  isHovered: boolean = false;

  openForm() {
    this.openContact = !this.openContact;
    // works!
  }

}
