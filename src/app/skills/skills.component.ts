import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SkillIconComponent } from '../skill-icon/skill-icon.component';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [NgFor, SkillIconComponent, RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  /**
   * Deterministic pseudo-random per icon (seeded by index) — stable between
   * server render and browser so hydration never mismatches.
   */
  private rand(i: number, salt: number): number {
    const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  /**
   * Horizontal crossing time: 8s – 68s. Squaring the random skews the
   * distribution so a few icons zip across while most drift lazily —
   * a clearly visible speed spread.
   */
  xDur(i: number): string {
    const r = this.rand(i, 1);
    return `${(8 + (1 - r * r) * 60).toFixed(1)}s`;
  }

  /** Negative delay scatters icons across the width instead of starting at the edge. */
  xDelay(i: number): string {
    return `${(-this.rand(i, 2) * 60).toFixed(1)}s`;
  }

  /** ~40% of icons travel right-to-left. */
  xDir(i: number): string {
    return this.rand(i, 3) < 0.4 ? 'reverse' : 'normal';
  }

  /** Vertical baseline within the field. */
  topPos(i: number): string {
    return `${(12 + this.rand(i, 4) * 60).toFixed(1)}%`;
  }

  /** Wave amplitude: 12px – 52px, unique per icon. */
  yAmp(i: number): string {
    return `${(12 + this.rand(i, 5) * 40).toFixed(0)}px`;
  }

  /** Wave half-period: 2.2s – 5.4s. */
  yDur(i: number): string {
    return `${(2.2 + this.rand(i, 6) * 3.2).toFixed(2)}s`;
  }

  /** Random wave phase. */
  yDelay(i: number): string {
    return `${(-this.rand(i, 7) * 6).toFixed(2)}s`;
  }

  skills = [{
    label: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  {
    label: 'C',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
  },
  {
    label: 'C++',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-plain.svg',
  },
  {
    label: 'Java',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    label: 'Prolog',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prolog/prolog-plain.svg',
  },
  {
    label: 'Git',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    label: 'Docker',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg',
  },
  {
    label: 'Kubernetes',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain-wordmark.svg',
  },
  {
    label: 'Linux',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-plain.svg',
  },
  {
    label: 'Raspberry Pi',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-plain.svg',
  },
  {
    label: 'Arduino',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original-wordmark.svg',
  },
  {
    label: 'SQLite',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-plain.svg',
  },
  {
    label: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
  },
  {
    label: 'Javascript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg',
  },
  {
    label: 'Typescript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg',
  },
  {
    label: 'Angular',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-plain.svg',
  },
  {
    label: 'Html',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg',
  },
  {
    label: 'Sass',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
  },
  {
    label: 'RxJS',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rxjs/rxjs-plain.svg'
  },
  {
    label: 'Scheme',
    src: './assets/racket-4.svg'
  },
  {
    label: 'Rust',
    src: 'https://rust-lang.org/logos/rust-logo-512x512.png'
  },
  {
    label: 'Tcl',
    src: 'https://www.svgrepo.com/show/374119/tcl.svg'
  }
  ];
}
