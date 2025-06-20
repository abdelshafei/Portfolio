import { Component, signal, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common'

export interface project {
  header: string;
  description: string;
  date: string;
  skills: string;
  gitLink: string;
  ytLink: string | null;
};


@Component({
  selector: 'app-project-card',
  imports: [NgIf],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {

  isFlipped = signal(false);
  @Input() projDetails!: project;

  flip(event: KeyboardEvent) : void {
    if(event.key.toLowerCase() === 'f')
    this.isFlipped.set(!this.isFlipped);
  }
}
