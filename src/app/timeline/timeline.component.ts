import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
    events = [
    {
      status: 'Studying in Carleton University',
      startDate: 'Sept 2022',
      endDate: 'Graduation Expected May 2027',
      color: '#FAFAFA',
      image: 'https://carleton.ca/brand/wp-content/uploads/brand-logo-800w-1.jpg',
      description: `
      <span> Studying Computer Science with a specialization in Artificial Intelligence and Machine Learning at Carleton University, I've spent the past three years immersing myself in both foundational and advanced topics.</span> 
      `
    },
    {
      status: 'Undergraduate Teaching Assistant',
      startDate: 'Jan 2025',
      endDate: 'April 2025',
      color: '#FAFAFA',
      image: 'https://carleton.ca/brand/wp-content/uploads/brand-logo-800w-1.jpg',
      description: `
      <span> Teaching assistant for Introduction to Software Engineering (COMP2404) under Dr. Darryl Hill. </span>
      `
    },
  ];
}