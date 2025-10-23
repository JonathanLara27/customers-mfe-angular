import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header-dialog.component.html',
  styleUrl: './header-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDialogComponent { 

  title = input.required<string>();

  close = output<void>();

  closeDialog() {
    this.close.emit();
  }

}
