import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-timeline',
  imports: [TimelineModule, CardModule, ButtonModule, NgIf, NgStyle],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  
    events = [
    {
      status: 'Studying in Carleton University',
      startDate: 'Sept 2022',
      endDate: 'Graduation Expected May 2027',
      color: '#C8102E',
      image: 'https://cdn.carleton.ca/rds/assets/cu-logos/cu-logo-color-right-horiztonal.svg',
      description: `
      <ul>
        <li> Studying Computer Science with a specialization in Artificial Intelligence and Machine Learning at Carleton University, I’ve spent the past three years immersing myself in both foundational and advanced topics.</li> 
        <br>
        <li> I began with core computer science fundamentals — discrete structures, object-oriented engineering, and my first exposure to web development using vanilla HTML, CSS, and JavaScript.</li> 
        <br>
        <li> Throughout this journey, I developed an interest in practical application. During my Database Management course, I went beyond the course requirements to build a full-stack Angular web application as a term project — combining frontend skills with backend data handling.</li>
        <br>
        <li> I further expanded my knowledge through in-depth work on Linux-based operating systems, and explored diverse programming paradigms including Scheme (a precursor to JavaScript) and Prolog, strengthening both theoretical and functional perspectives.</li> 
        <br>
        <li> Each course not only added to my technical toolkit but also deepened my understanding of how different layers of computing interact — from hardware-level operations to high-level application logic.</li>
      </ul>
      `
    },
    {
      status: 'Undergraduate Teaching Assistant',
      startDate: 'Jan 2025',
      endDate: 'April 2025',
      color: '#466D1D',
      image: 'https://cdn.carleton.ca/rds/assets/cu-logos/cu-logo-color-right-horiztonal.svg',
      description: `
      <ul>
        <li> Leading weekly tutorial sessions designed to reinforce course material, provide in-depth explanations of C++ concepts, and guide students through hands-on problem-solving activities to enhance their understanding and application of programming principles.</li>
        <br>
        <li>Leading weekly office hours, explaining core C++ concepts such as object-oriented programming, data structures, and debugging, while providing one-on-one assistance with assignments and troubleshooting code.</li>
        <br>
        <li>Evaluating assignments and exams, providing actionable feedback to foster student learning and academic success.</li>
      </ul>
      `
    },
  ];
}
