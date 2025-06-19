import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-timeline',
  imports: [TimelineModule, CardModule, ButtonModule, NgIf],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
    events = [
    {
      status: 'Started Project',
      date: '2024-01-01',
      icon: 'pi pi-check',
      color: '#C8102E',
      image: 'https://cdn.carleton.ca/rds/assets/cu-logos/cu-logo-color-right-horiztonal.svg',
      description: ''
    },
    {
      status: 'Development',
      date: '2024-02-15',
      icon: 'pi pi-cog',
      color: '#10b981',
      image: 'black-watch.jpg'
    },
  ];
}
