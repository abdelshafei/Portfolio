import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent, NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [{
    header: 'iTunsify App',
    description: 'Web-based interactive database inspired by streaming-services such as iTunes, spotify, etc.',
    date: 'Oct 2024 - Dec 2024',
    skills: 'Angular16, Node.js, SQLite, Typescript, Javascript',
    gitLink: 'https://github.com/abdelshafei/iTunesfy',
    ytLink: 'https://youtu.be/JBTTAJZrjFo'
  },
  {
    header: 'BMP280 Device Driver',
    description: 'Linux Kernel module for the BMP280 digital pressure and temperature sensor. It exposes real-time temperature and pressure readings to userspace via the sysfs filesystem.',
    date: 'June 2025 - July 2025',
    skills: 'Linux Kernel, RaspberryPi, C, Sysfs, Manual configuration of registers by *.i2c.smbus api',
    gitLink: 'https://github.com/abdelshafei/BMP280-device-driver',
    ytLink: 'https://youtu.be/1EwXVq_9rCo'
  },
  {
    header: 'ASCII Camera',
    description: 'A python program that turns each live webcam frames into Ascii pixelated frames on the terminal.',
    date: 'May 2025 - June 2025',
    skills: 'openCV Python',
    gitLink: 'https://github.com/abdelshafei/ASCII-Camera',
    ytLink: 'https://www.youtube.com/watch?v=ggeKsc3IKwk'
  },
  {
    header: 'RaDoTech Simulation',
    description: 'This project simulates the functionality of the RaDoTech health monitoring device, including scanning, data processing, and visualization of health metrics for different user profiles. The system allows users to initiate scans, view results in charts, and monitor device states like battery level.',
    date: 'Oct 2024 - Dec 2024',
    skills: 'Qt, C++, Agile Methodologies',
    gitLink: 'https://github.com/ParamDesai111/3004-Final-Project',
    ytLink: null
  },
  {
    header: 'Multi-Threaded Ghost Hunter Simulation',
    description: 'A terminal-based multi-threaded C program simulating four ghost hunters and a ghost navigating a LinkedList-structured house. Threads interact based on evidence collection and behavioral conditions until termination criteria are met.',
    date: 'Nov 2023 - Dec 2023',
    skills: 'C, Multi-threads',
    gitLink: 'https://github.com/abdelshafei/GhostHuntSimulatora',
    ytLink: null
  },
  { 
    header: 'Syntax Interpreter',
    description: 'A programming language interpreter built on top of C++.',
    date: 'Dec 2024 - Jan 2025',
    skills: 'C++, Token Parser, Tree-based Evaluator',
    gitLink: 'https://github.com/abdelshafei/CodeInterpreter',
    ytLink: null
  }]
}
