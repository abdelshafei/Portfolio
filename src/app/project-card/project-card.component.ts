import { Component, signal, Input, HostListener } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export interface Project {
  header: string;
  description: string;
  date: string;
  skills: string;
  gitLink: string;
  ytLink: string | null;
}

@Component({
  selector: 'app-project-card',
  imports: [NgIf, NgFor],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() projDetails!: Project;

  isFlipped = signal(false);

  get skillList(): string[] {
    return this.projDetails.skills.split(',').map(s => s.trim()).filter(Boolean);
  }

  /**
   * On desktop the card flips on hover (pure CSS). On touch devices
   * (no hover capability) a single tap toggles the flip instead.
   */
  @HostListener('click')
  flip(): void {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      this.isFlipped.set(!this.isFlipped());
    }
  }
}
