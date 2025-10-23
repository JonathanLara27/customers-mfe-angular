import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderDialogComponent } from '../../shared/header-dialog/header-dialog.component';
import { FooterDialogComponent } from '../../shared/footer-dialog/footer-dialog.component';
import { UpsertCustomerDialogService } from './upsert-customer-dialog.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../shared/interfaces';
import { getFieldErrors, isValidField } from '../../shared/helpers/validateForms';

@Component({
  selector: 'app-upsert-customer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,

    HeaderDialogComponent,
    FooterDialogComponent,
  ],
  providers: [UpsertCustomerDialogService],
  templateUrl: './upsert-customer-dialog.component.html',
  styleUrl: './upsert-customer-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertCustomerDialogComponent { 
  
  //public solo para el test.
  public readonly upsertCustomerDialogService = inject(UpsertCustomerDialogService);
  private readonly dialogRef = inject(MatDialogRef<UpsertCustomerDialogComponent>);
  private data : { customer?: Customer} = inject(MAT_DIALOG_DATA);

  public title = this.upsertCustomerDialogService.title$;
  public titleButton = this.upsertCustomerDialogService.titleButton$;

  public formCustomer = this.upsertCustomerDialogService.formCustomer;

  public iteratorForm = this.upsertCustomerDialogService.iteratorForm;

  private initializeForm() {
    if(!this.data?.customer) return;
    this.upsertCustomerDialogService.setFormToEdit(this.data.customer);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public close() {
    this.dialogRef.close(null);
  }

  public isValidField(field: string, fg: FormGroup): boolean | null {
    return isValidField(field, fg);
  }

  public getFieldErrors(field: string, fg: FormGroup): string | null {
    return getFieldErrors(field, fg);
  }

  public submitForm() {
    if(this.formCustomer.invalid) return this.formCustomer.markAllAsTouched();
    const option = this.data?.customer ? 'edit' : 'create';
    const data = this.upsertCustomerDialogService.buildData(option);
    this.dialogRef.close(data);
  }

}
