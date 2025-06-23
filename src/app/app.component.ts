import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';


@Component({
  selector: 'app-root',
  imports: [HomeComponent, NavComponent, TimelineComponent, ProjectsComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
