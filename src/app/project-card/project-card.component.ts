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
  private lastTapTime = 0;
  private tapTimeout: any;

  @HostListener('dblclick', ['$event']) // --> Double clicks on desktops
  flipDesk(event: Event) : void {
    this.isFlipped.set(!this.isFlipped());
    event.preventDefault();
  }

  @HostListener('touchend', ['$event'])
  flipPhone(event: Event) : void {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTapTime;

    clearTimeout(this.tapTimeout); 

    if (tapLength < 500 && tapLength > 0) {
      console.log('Double tap detected!');
        this.isFlipped.set(!this.isFlipped());
        event.preventDefault();
      event.preventDefault();
    }
  }

}
