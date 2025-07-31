import { Component, afterNextRender, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { NgIf, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [HomeComponent, NavComponent, TimelineComponent, ProjectsComponent, AboutComponent, ContactFormComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit, OnDestroy {
  vantaEffect: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
      .then(() => this.loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js'))
      .then(() => {
        const VANTA = (window as any).VANTA;
        if (VANTA && VANTA.CLOUDS) {
          VANTA.CLOUDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00
          })
        } else {
          console.error("VANTA.CLOUDS is not available.");
        }
      })
      .catch(err => console.error("Failed to load Vanta.js scripts", err));
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(`Failed to load script: ${src}`);
        document.head.appendChild(script);
    });
  }

  Year = new Date().getFullYear();

  openContact: boolean = false;
  isHovered: boolean = false;

  openForm() {
    this.openContact = true;
  }
}

