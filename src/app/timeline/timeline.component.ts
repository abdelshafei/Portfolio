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
      status: 'Studying at Carleton University',
      date: '2022',
      color: '#FAFAFA',
      description: `
      <span> Studying Computer Science with a specialization in Artificial Intelligence and Machine Learning at Carleton University, I've spent the past three years immersing myself in both foundational and advanced topics.</span> 
      `,
      dotImg: 'https://cdn-icons-png.freepik.com/512/7655/7655404.png'
    },
    {
      status: 'Undergraduate Teaching Assistant',
      date: '2025',
      color: '#FAFAFA',
      description: `
      <span> Teaching assistant for Introduction to Software Engineering (COMP2404) under Dr. Darryl Hill. </span>
      `,
      dotImg: 'https://cdn-icons-png.freepik.com/512/7527/7527819.png'
    },
  ];

}