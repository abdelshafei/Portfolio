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
  constructor() {}

  events = [
    {
      status: 'Studying at Carleton University',
      date: '2022',
      color: '#FAFAFA',
      description: `
      Studying Computer Science with a specialization in Artificial Intelligence and Machine Learning at Carleton University, I've spent the past three years immersing myself in both foundational and advanced topics. I'm currently in my final year and expect to graduate in May 2027. 
      `,
      dotImg: 'https://cdn-icons-png.freepik.com/512/7655/7655404.png'
    },
    {
      status: 'Undergraduate Teaching Assistant',
      date: '2025',
      color: '#FAFAFA',
      description: `
      From January to April 2025, I assisted Dr. Darryl Hill in teaching COMP2404: Introduction to Software Engineering. I led weekly tutorials and office hours, helping students strengthen their understanding of C++ concepts like object-oriented programming and data structures, while also supporting assignment guidance and troubleshooting.
      `,
      dotImg: 'https://cdn-icons-png.freepik.com/512/7527/7527819.png'
    },
  ];

}