import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { NgFor, isPlatformBrowser } from '@angular/common';
import { ProjectCardComponent, Project } from '../project-card/project-card.component';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent, NgFor, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  /** How much scroll (in vh) advances one project. */
  private readonly stepVh = 55;

  activeIndex = signal(0);

  @ViewChild('stageWrapper') stageWrapper?: ElementRef<HTMLDivElement>;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Total height of the scroll runway: one viewport + one step per remaining card. */
  get wrapperHeight(): string {
    return `calc(100vh + ${(this.projects.length - 1) * this.stepVh}vh)`;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser || !this.stageWrapper) return;

    const el = this.stageWrapper.nativeElement;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const step = (window.innerHeight * this.stepVh) / 100;
    const raw = Math.round((window.scrollY - top) / step);
    const clamped = Math.max(0, Math.min(this.projects.length - 1, raw));

    if (clamped !== this.activeIndex()) {
      this.activeIndex.set(clamped);
    }
  }

  goTo(index: number): void {
    if (!this.isBrowser || !this.stageWrapper) return;

    const el = this.stageWrapper.nativeElement;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const step = (window.innerHeight * this.stepVh) / 100;
    window.scrollTo({ top: top + index * step, behavior: 'smooth' });
  }

  format(n: number): string {
    return n.toString().padStart(2, '0');
  }

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
    skills: 'Linux Kernel, RaspberryPi, C, Sysfs, I2C/SMBus register configuration, Device Driver operations',
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
  },
  {
    header: 'Distributed FileSystem',
    description: 'A distributed filesystem hosted on a centeralized and multi-threaded server making it accessible by multiple clients.',
    date: 'May 2025 - July 2025',
    skills: 'C, Linux, FUSE, TCP/IP, Multi-threads',
    gitLink: 'https://github.com/ak1lly/shared-folder-over-network',
    ytLink: null
  },
  {
    header: 'Rat Archiver',
    description: 'A Rust-based archiver that packs regular files, symlinks, and hard links into compressed .rat archives. Modeled after the Unix tar utility, with added support for serialization and size-efficient storage.',
    date: 'July 2025 - July 2025',
    skills: 'Rust, Linux, File I/O, Serialization, Deserialization, Binary Encoding/Decoding, Compression Algorithms',
    gitLink: 'https://github.com/abdelshafei/rat',
    ytLink: null
  }];
}
