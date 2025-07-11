import { Component, signal, inject } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [ MatTooltipModule, NgClass ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('PhotoFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('AboutFadeIn', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(120px)'}),
        animate('0.8s cubic-bezier(.34,1.56,.63,1.19)', style({opacity: 1, transform: 'translateX(0)'}))
      ])
    ])
  ]
})
export class HomeComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private AuthorName: string = 'Abdelrahman ElShafay';
  displayAuthorName = signal('Abdelrahman ElShafay');
  private indexAuthor: number = 0;

  private phrases = [
    'Full Stack Web Applications.',
    'Embedded Systems.',
    'Systems Programming.',
    'Collaborating on projects that make a difference.',
    'Always learning. Always building.'
  ];
  displayInterest = signal('');
  private currentPhraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: number | null = null;

  ngOnInit(): void {
    // this.typeNextCharAuth(); 
    this.indexAuthor = 0;

    this.typeNextCharinterest();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  // private typeNextCharAuth() {
  //   if (this.indexAuthor < this.AuthorName.length) {
  //     setTimeout(() => {
  //       this.displayAuthorName.set(this.displayAuthorName() + this.AuthorName[this.indexAuthor]);
  //       this.indexAuthor++;
  //       this.typeNextCharAuth();
  //     }, 100);
  //   }
  // }

  private typeNextCharinterest(): void {
    const currentPhrase = this.phrases[this.currentPhraseIndex];

    if (this.isDeleting) {
      this.displayInterest.set(currentPhrase.substring(0, this.charIndex--));
    } else {
      this.displayInterest.set(currentPhrase.substring(0, this.charIndex++));
    }

    let delay = this.isDeleting ? 60 : 120;

    if (!this.isDeleting && this.charIndex === currentPhrase.length + 1) {
      delay = 1500; // pause before deleting
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === -1) {
      this.isDeleting = false;
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
      this.charIndex = 0;
      delay = 400; // pause before typing next
    }

    if (this.isBrowser) {
      this.timeoutId = window.setTimeout(() => this.typeNextCharinterest(), delay);
    }
  }

  isSpinning = false;
  lock = true;
  timeoutid: ReturnType<typeof setTimeout> | null = null;

  toggleSpin(): void {
    if (this.timeoutid) {
      clearTimeout(this.timeoutid);
      this.timeoutid = null;
    }

    this.isSpinning = true;

    this.timeoutid = setTimeout(() => {
      this.isSpinning = false;
      this.lock = !this.lock;
    }, 1800); 
  }

}
