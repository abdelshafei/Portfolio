import { Component, Input } from '@angular/core';

export interface course {
  title: string;
  code: string;
  description: string;
  date: string;
  grade: string;
  skills: string;
};

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() courseDetails!: course;

  
}
