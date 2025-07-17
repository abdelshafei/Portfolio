import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { LetterComponent } from '../letter/letter.component'

@Component({
  selector: 'app-desc',
  imports: [ LetterComponent, NgFor ],
  templateUrl: './desc.component.html',
  styleUrl: './desc.component.scss'
})
export class DescComponent {
  description = Array.from( 'I\’m Abdelrahman ElShafay, an upcoming fourth-year Computer Science student at Carleton University with a passion for understanding systems from the ground up. I\’m especially interested in embedded development, operating systems, and full-stack web development. Whether I\’m working close to the hardware or designing user-facing applications, I enjoy learning by building and love bridging theory with practical skills. I\'m constantly exploring new tools and ideas, always aiming to grow as a well-rounded developer.')
}
