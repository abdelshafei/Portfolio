import { Component, signal, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  imports: [ MatTooltipModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private AuthorName: string = 'Hi, I\'m Abdelrahman ElShafay!';
  displayAuthorName = signal('');
  private indexAuthor: number = 0;

  private phrases = [
    'Full Stack Web Applications.',
    'Embedded Systems.',
    'Machine Learning.',
    'Learning new tech!'
  ];
  displayInterest = signal('');
  private currentPhraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: number | null = null;

  ngOnInit(): void {
    this.typeNextCharAuth(); 
    this.indexAuthor = 0;

    this.typeNextCharinterest();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private typeNextCharAuth() {
    if (this.indexAuthor < this.AuthorName.length) {
      setTimeout(() => {
        this.displayAuthorName.set(this.displayAuthorName() + this.AuthorName[this.indexAuthor]);
        this.indexAuthor++;
        this.typeNextCharAuth();
      }, 100);
    }
  }

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
}
