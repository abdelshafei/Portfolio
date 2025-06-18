import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';


@Component({
  selector: 'app-root',
  imports: [HomeComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
