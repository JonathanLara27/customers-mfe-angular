import { Injectable, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BUTTON_CUSTOMER_DIALOG_CREATE, BUTTON_CUSTOMER_DIALOG_EDIT, ITERATOR_FORM_CUSTOMERS, TITLE_CUSTOMER_DIALOG_CREATE, TITLE_CUSTOMER_DIALOG_EDIT } from './upsert-customer-dialog.constants';
import { CreateCustomerDTO, Customer, UpdateCustomerDTO } from '../../shared/interfaces';

@Injectable()
export class UpsertCustomerDialogService {

  private fb = inject(FormBuilder);

  public formCustomer = this.fb.nonNullable.group({
    id: this.fb.control<number | null>(null),
    name: this.fb.nonNullable.control<string>('', {validators: [Validators.required, Validators.minLength(3)]}),
    email: this.fb.nonNullable.control<string>('', {validators: [Validators.required, Validators.email]}),
    phone: this.fb.nonNullable.control<string>('', { validators: [Validators.pattern(/^\+?\d[\d\s-]{6,18}$/)]}),
  });

  public iteratorForm = computed(() => ITERATOR_FORM_CUSTOMERS);

  private title = signal<string>(TITLE_CUSTOMER_DIALOG_CREATE);
  public title$ = computed(() => this.title());

  private titleButton = signal<string>(BUTTON_CUSTOMER_DIALOG_CREATE);
  public titleButton$ = computed(() => this.titleButton());
  
  constructor() { }


  public setFormToEdit(customer: Customer) {
    this.formCustomer.patchValue(customer);
    this.setTitleToEdit();
    this.setTitleButtonToEdit();
  }

  private setTitleToEdit() {
    this.title.set(TITLE_CUSTOMER_DIALOG_EDIT);
  }

  private setTitleButtonToEdit() {
    this.titleButton.set(BUTTON_CUSTOMER_DIALOG_EDIT);
  }

  public resetForm() {
    this.formCustomer.reset();
  }

  public buildData(option: 'create' | 'edit'): CreateCustomerDTO | UpdateCustomerDTO {
    const formValue = this.formCustomer.getRawValue();
    const {id, ...rest} = formValue;
    if (option === 'create') {
      return rest as CreateCustomerDTO;
    } else {
      return { id: id!, ...rest } as UpdateCustomerDTO;
    }
  }

}
