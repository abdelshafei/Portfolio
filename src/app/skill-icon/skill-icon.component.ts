import { Component, Input, ViewChild } from '@angular/core';
import { MatTooltipModule, MatTooltip } from '@angular/material/tooltip';

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
  @ViewChild('tooltip') tooltip!: MatTooltip;

  onClick() {
    setTimeout(() => {
      this.tooltip.show();
    }, 2000);

    setTimeout(() => {
      this.tooltip.hide();
    }, 100);
  }
}
