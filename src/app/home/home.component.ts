import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private AuthorName: string = 'Hi, I\'m Abdelrahman ElShafay!';
  displayAuthorName = signal('');
  private indexAuthor: number = 0;

  private phrases = [
    'Full Stack Web Applications',
    'Embedded Systems',
    'Making things work on the edge!'
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
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
      delay = 400; // pause before typing next
    }

    this.timeoutId = window.setTimeout(() => this.typeNextCharinterest(), delay);
  }
}
