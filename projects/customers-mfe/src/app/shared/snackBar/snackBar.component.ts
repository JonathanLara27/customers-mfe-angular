import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatIconModule
  ],
  templateUrl: './snackBar.component.html',
  styleUrl: './snackBar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SnackBarComponent {
  private snackBarRef = inject(MatSnackBarRef);
  public data : string = inject(MAT_SNACK_BAR_DATA);

  close () {
    this.snackBarRef.dismissWithAction();
  }
 }
