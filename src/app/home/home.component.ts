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

  private interestList: string[] = ["Full Stack Web Applications", "Embedded systems", "making things work on the edge!"];
  displayInterest = signal('');
  private indexInterestChar: number = 0;
  private InterestIndex: number = 0;
  private TypedOut: boolean = false;

  ngOnInit(): void {
    this.typeNextCharAuth(); 
    this.indexAuthor = 0;
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

  private typeNextCharinterest() {
    if (this.indexInterestChar < this.interestList[this.InterestIndex].length) {
      setTimeout(() => {
        this.displayAuthorName.set(this.displayAuthorName() + this.AuthorName[this.indexInterestChar]);
        this.indexAuthor++;
        this.typeNextCharAuth();
      }, 100);
    }

    if (this.indexInterestChar === this.AuthorName.length) {

    }
  }
}
