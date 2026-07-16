import { Component, Input } from '@angular/core';

export interface Skill {
  label: string;
  src: string;
}

@Component({
  selector: 'app-skill-icon',
  imports: [],
  templateUrl: './skill-icon.component.html',
  styleUrls: ['./skill-icon.component.scss']
})
export class SkillIconComponent {
  @Input() skillDets!: Skill;
}
