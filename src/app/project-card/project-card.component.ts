import { Component, signal, Input, HostListener } from '@angular/core';
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

  @Input() projDetails!: project;
  isFlipped = signal(false);
  private lastTap = 0;

  @HostListener('dblclick', ['$event']) // ---> Double clicks on desktops
  flip(event: Event) : void {
    this.isFlipped.set(!this.isFlipped());
    event.preventDefault();
  }

}
