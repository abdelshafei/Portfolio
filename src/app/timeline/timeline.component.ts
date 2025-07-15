import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
// import { trigger, transition, style, animate, state } from '@angular/animations';
import { animate, onScroll } from 'animejs';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  // animations: [ 
  // trigger('scrollDotFade', [
  //   state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
  //   state('hidden', style({ opacity: 0, transform: 'translateY(30px)' })),
  //   transition('hidden => visible', animate('500ms ease-out')),
  //   transition('visible => hidden', animate('300ms ease-in'))
  //   ])
  // ]
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
      `,
      isEmitting: false,
      isPulsating: false,
      timeoutId: null as ReturnType<typeof setTimeout> | null
    },
    {
      status: 'Undergraduate Teaching Assistant',
      startDate: 'Jan 2025',
      endDate: 'April 2025',
      color: '#FAFAFA',
      image: 'https://carleton.ca/brand/wp-content/uploads/brand-logo-800w-1.jpg',
      description: `
      <span> Teaching assistant for Introduction to Software Engineering (COMP2404) under Dr. Darryl Hill. </span>
      `,
      isEmitting: false,
      isPulsating: false,
      timeoutId: null as ReturnType<typeof setTimeout> | null,
    },
  ];

  onMouseEnter(event:  any) {
    if (event.timeoutId) {
      clearTimeout(event.timeoutId);
      event.timeoutId = null;
    }

    event.isEmitting = true;
    event.isPulsating = true;
  }

  onMouseLeave(event: any) {
    event.timeoutId = setTimeout(() => {
      event.isEmitting = false;
      event.isPulsating = false;
    }, 1000);
  }


}