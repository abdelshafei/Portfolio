import { ChangeDetectionStrategy, Component, Output, EventEmitter, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact-form',
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent {           
  @Output() close = new EventEmitter();

  readonly name = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly msg = new FormControl('', [Validators.required]);

  isSending = false;

  errorMessage = signal('');

  subMessage = signal('');
  private loadingDots = 0;
  private loadingInterval: any;

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  startLoadingAnimation() {
    this.loadingDots = 0;
    this.loadingInterval = setInterval(() => {
      this.loadingDots = (this.loadingDots + 1) % 4;
      const dots = '.'.repeat(this.loadingDots);
      this.subMessage.set(`Sending${dots}`);
    }, 300);
  }

  stopLoadingAnimation() {
    clearInterval(this.loadingInterval);
    this.loadingInterval = null;
  }

  async onSubmit(event: Event) {
    event.preventDefault(); 

    this.isSending = true;

    const formData = new FormData();
    formData.append('form-name', 'contact');
    formData.append('name', this.name.value!);
    formData.append('email', this.email.value!);
    formData.append('msg', this.msg.value!);

    this.startLoadingAnimation();

    try {
      await fetch('/', {
        method: 'POST',
        body: formData
      });

      this.subMessage.set('Sent!')
    } catch (err) {
      this.subMessage.set('Failed to send.')
    }

    this.stopLoadingAnimation();

    await delay(2000);

    this.isSending = false;
    this.close.emit();
  }

  onCloseClick() {
    this.close.emit();
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

