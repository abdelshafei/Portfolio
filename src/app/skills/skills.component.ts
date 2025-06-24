import { Component } from '@angular/core';
import { SkillIconComponent } from '../skill-icon/skill-icon.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [SkillIconComponent, NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills = [{
    label: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    waveAmp: 20,
    speed: 3
  },
  {
    label: 'C',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    waveAmp: 10,
    speed: 1
  },
  {
    label: 'C++',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    waveAmp: 10,
    speed: 2
  },
  {
    label: 'Java',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Prolog',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prolog/prolog-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Git',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Docker',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Kubernetes',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain-wordmark.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Linux',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Raspberry Pi',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Arduino',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original-wordmark.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'SQL',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Javascript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Typescript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Angular',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Html',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    waveAmp: 30, //
    speed: 10 //
  },
  {
    label: 'Sass',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    waveAmp: 30, //
    speed: 10 //
  }
  ];
}
