import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Icon {
  label: string,
  src: string,
  waveAmp: number,
  speed: number
}

@Component({
  selector: 'app-skill-icon',
  imports: [MatTooltipModule],
  templateUrl: './skill-icon.component.html',
  styleUrl: './skill-icon.component.scss'
})
export class SkillIconComponent {
  @Input() iconDet!: Icon;
}
