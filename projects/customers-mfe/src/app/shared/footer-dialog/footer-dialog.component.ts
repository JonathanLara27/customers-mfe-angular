import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-footer-dialog',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './footer-dialog.component.html',
  styleUrl: './footer-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterDialogComponent {

  title = input.required<string>();

  buttonDisabled = input.required<boolean>();

  submit = output<void>();

  submitDialog() {
    this.submit.emit();
  }

 }
