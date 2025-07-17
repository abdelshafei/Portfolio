import { Component } from '@angular/core';
import { SkillsComponent } from '../skills/skills.component'
import { CoursesComponent } from '../courses/courses.component'
import { DescComponent } from '../desc/desc.component'

@Component({
  selector: 'app-about',
  imports: [SkillsComponent, CoursesComponent, DescComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
