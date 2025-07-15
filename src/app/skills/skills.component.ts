import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SkillIconComponent } from '../skill-icon/skill-icon.component';

@Component({
  selector: 'app-skills',
  imports: [NgFor, SkillIconComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills = [{
    label: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  {
    label: 'C',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-plain.svg',
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
  }
  ];

}
