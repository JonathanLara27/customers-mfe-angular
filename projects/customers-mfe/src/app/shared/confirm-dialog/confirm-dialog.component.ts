import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogDataConfirm {
  title: string;
  message: string;
  titleButtonMain?: string,
  tittleButtonSecondary?: string
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent { 

  public title = signal<string>('');

  public message = signal<string>('');

  public titleButtonMain = signal<string>('Aceptar');
  public tittleButtonSecondary = signal<string>('Cancelar');

  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  public data: DialogDataConfirm = inject(MAT_DIALOG_DATA);


  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData() {
    this.title.set(this.data?.title);
    this.message.set(this.data?.message);
    if (this.data?.titleButtonMain) {
      this.titleButtonMain.set(this.data?.titleButtonMain);
    }
    if (this.data?.tittleButtonSecondary) {
      this.tittleButtonSecondary.set(this.data?.tittleButtonSecondary);
    }
  }

  public close(){
    this.dialogRef.close(false);
  }

  public confirm(){
    this.dialogRef.close(true);
  }

}
