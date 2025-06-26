import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Skill {
  label: string;
  src: string;
}

@Component({
  selector: 'app-skill-icon',
  imports: [MatTooltipModule],

  templateUrl: './skill-icon.component.html',
  styleUrls: ['./skill-icon.component.scss']
})
export class SkillIconComponent {
  @Input() skillDets!: Skill;
}
