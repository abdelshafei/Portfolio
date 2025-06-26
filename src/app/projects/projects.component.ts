import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList  } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';

interface Project {
  header: string;
  description: string;
  date: string;
  skills: string;
  gitLink: string;
  ytLink: string | null;
}

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent, NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [{
    header: 'iTunsify App',
    description: 'Web-based interactive database inspired by streaming-services such as iTunes, spotify, etc.',
    date: 'Oct 2024 - Dec 2024',
    skills: 'Angular16, Node.js, SQLite, REST, RxJS, Typescript, Javascript',
    gitLink: 'https://github.com/abdelshafei/iTunesfy',
    ytLink: 'https://youtu.be/JBTTAJZrjFo'
  },
  {
    header: 'BMP280 Device Driver',
    description: 'Linux Kernel module for the BMP280 digital pressure and temperature sensor. It exposes real-time temperature and pressure readings to userspace via the sysfs filesystem.',
    date: 'June 2025 - June 2025',
    skills: 'Linux Kernel, RaspberryPi, C, Sysfs, Manual configuration of registers by *.i2c.smbus API calls, Device Driver operations',
    gitLink: 'https://github.com/abdelshafei/BMP280-device-driver',
    ytLink: 'https://youtu.be/1EwXVq_9rCo'
  },
  {
    header: 'Chatting App',
    description: 'A real-time web-based messaging platform built with WebSockets and room-based architecture. Designed to support private messaging and minimize server-side exposure of user data through basic data abstraction and client-managed identifiers.',
    date: 'April 2024 - May 2024',
    skills: 'HTML, CSS, Javascript, Node.js, WebSockets',
    gitLink: 'https://github.com/abdelshafei/ChattingApp',
    ytLink: null
  },
  {
    header: 'ASCII Camera',
    description: 'A python program that turns live webcam frames into Ascii pixelated frames on the terminal.',
    date: 'May 2025 - June 2025',
    skills: 'Python, OpenCV',
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
    header: 'Ghost Hunter Simulation',
    description: 'A terminal-based multi-threaded C program simulating four ghost hunters and a ghost navigating a LinkedList-structured house. Threads interact based on evidence collection and behavioral conditions until termination criteria are met.',
    date: 'Nov 2023 - Dec 2023',
    skills: 'C, Multi-threads, Data Structures',
    gitLink: 'https://github.com/abdelshafei/GhostHuntSimulator',
    ytLink: null
  },
  { 
    header: 'Syntax Interpreter',
    description: 'A programming language interpreter built on top of C++.',
    date: 'Dec 2024 - Jan 2025',
    skills: 'C++, Token Parser, Abstract Syntax Tree',
    gitLink: 'https://github.com/abdelshafei/CodeInterpreter',
    ytLink: null
  },
  {
    header: 'Distance Notifier',
    description: 'An arduino based project that gives visual and audio alerts based on how close an object is to the user.',
    date: 'May 2025 - June 2025',
    skills: 'C, Arduino Uno, HC-SR04 Ultrasonic Sensor, Common-cathode RGB LED, Piezo Buzzer',
    gitLink: 'https://github.com/abdelshafei/Distance-Sensor',
    ytLink: 'https://wokwi.com/projects/433297984977377281'
  }];
}
