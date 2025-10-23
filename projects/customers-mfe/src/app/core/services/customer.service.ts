import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { ApiCustomerService } from './api-customer.service';
import { firstValueFrom } from 'rxjs';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { COLUMNS_CUSTOMERS, CUSTOMERS_TITLE, CUSTUMERS_SUBTITLE, CUSTOMER_ROUTE_LIST, CUSTOMER_ROUTE_TABLE, TITLE_DELETE_CUSTOMER_DIALOG, MESSAGE_DELETE_CUSTOMER_DIALOG, CUSTOMER_ADD_TOOLTIP } from '../../shared/constants';
import { ButtonColumn } from '../../shared/table/table.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerDTO, Customer, ModalOptions, UpdateCustomerDTO } from '../../shared/interfaces';
import { openModal } from '../../shared/helpers/openModal';
import { UpsertCustomerDialogComponent } from '../../components/upsert-customer-dialog/upsert-customer-dialog.component';
import { AlertsService } from './alerts.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, DialogDataConfirm } from '../../shared/confirm-dialog/confirm-dialog.component';
import { RAPID_SEARCH_PLACEHOLDER } from '../constants';
@Injectable()
export class CustomerService {

  private readonly apiCustomerService = inject(ApiCustomerService);
  private readonly alertsService = inject(AlertsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  private fb = inject(FormBuilder);
  private statePage = signal<{ pageIndex: number; pageSize: number }>({ pageIndex: 0, pageSize: 5 });
  
  private customerResource = resource({
    loader: async () => await firstValueFrom(this.apiCustomerService.getCustomers(this.statePage().pageIndex, this.statePage().pageSize)),
  })

  private tableComponent: TableComponent | null = null;
  private paginator: MatPaginator | null = null;

  public title = computed(() => CUSTOMERS_TITLE);
  public subtitle = computed(() => CUSTUMERS_SUBTITLE);

  public tooltipAddCustomer = computed(() => CUSTOMER_ADD_TOOLTIP);

  public placeHolderSearch = computed(() => RAPID_SEARCH_PLACEHOLDER);

  public customers = computed<Customer[]>(() => this.customerResource.value()?.data ?? []);
  public total = computed(() => this.customerResource.value()?.total);
  public isLoading = computed(() => this.customerResource.isLoading());
  public error = computed(() => this.customerResource.error());
  public page = computed(() => this.statePage().pageIndex);
  public pageSize = computed(() => this.statePage().pageSize);

  public columnsCustomers = computed(() => COLUMNS_CUSTOMERS);

  public actionsCustomers = computed<ButtonColumn>(() => ({
    field: 'actions',
    header: 'Acciones',
    buttons: [
      {
        action: (row: Customer) => this.openModalEditCustomer(row),
        label: (row: Customer) => 'Editar',
        icon: (row: Customer) => 'edit',
        show: (row: Customer) => true,
      },
      {
        action: (row: Customer) => this.openModalConfirlDeleteCustomer(row),
        label: (row: Customer) => 'Eliminar',
        icon: (row: Customer) => 'delete',
        buttonClass: 'mat-warn',
        show: (row: Customer) => true,
      }
    ]
  }));


  public form = this.fb.nonNullable.group({
    search: [''],
  });
  
  constructor() { 
    this.valueChangesSearchForm();
  }

  private valueChangesSearchForm() {
    this.form.get('search')?.valueChanges.subscribe({
      next: (value) => {
        if (!value || !this.tableComponent) return;
        const normalizeValue = value.trim().toLowerCase();
        this.tableComponent.setFilter(normalizeValue);
      }
    });
  }

  private fetchCustomers() {
    this.customerResource.reload();
  }

  private fetchUpdateCustomer(id: number, customer: UpdateCustomerDTO) {
    return this.apiCustomerService.patchCustomer(id, customer);
  }

  private async updateCustomer(id: number, result: UpdateCustomerDTO) {
    try {
      await firstValueFrom(this.fetchUpdateCustomer(id, result));
      this.handlerUpdateCustomerSuccess();
    } catch (error) {
      this.handleErrorUpdateCustomer();
    }
  }

  private handlerUpdateCustomerSuccess() {
    this.fetchCustomers();
    this.alertsService.showAlertSuccess('Cliente actualizado con éxito');
  }

  private handleErrorUpdateCustomer() {
    this.alertsService.showAlertError('Error al actualizar el cliente');
  }

  private fetchCreateCustomer(customer: CreateCustomerDTO) {
    return this.apiCustomerService.createCustomer(customer);
  }

  private async createCustomer(customer: CreateCustomerDTO) {
    try {
      const result = await firstValueFrom(this.fetchCreateCustomer(customer));
      this.handlerCreateCustomerSuccess(result.name);
    } catch (error) {
      this.handlerCreateCustomerError();
    }
  }

  private handlerCreateCustomerSuccess(name: string) {
    this.fetchCustomers();
    this.alertsService.showAlertSuccess(`Cliente ${name} creado con éxito`);
  }

  private handlerCreateCustomerError() {
    this.alertsService.showAlertError('Error al crear el cliente');
  }

  private fetchDeleteCustomer(id: number) {
    return this.apiCustomerService.deleteCustomer(id);
  }

  private async deleteCustomer(id: number) {
    try {
      await firstValueFrom(this.fetchDeleteCustomer(id));
      this.handlerDeleteCustomerSuccess();
    } catch (error) {
      this.handlerDeleteCustomerError();
    }
  }

  private handlerDeleteCustomerSuccess() {
    this.fetchCustomers();
    this.alertsService.showAlertSuccess('Cliente eliminado con éxito');
  }

  private handlerDeleteCustomerError() {
    this.alertsService.showAlertError('Error al eliminar el cliente');
  }

  public setPaginator(paginator: MatPaginator): void {
    this.paginator = paginator;
  }

  public setTable(tableComponent: TableComponent): void {
    this.tableComponent = tableComponent;
  }

  public valueChangesPaginator() {
    if(!this.paginator) return;
    this.paginator.page.subscribe({
      next: (event: PageEvent) => {
        const page = (event.pageIndex  || 0) + 1;
        const pageSize = event.pageSize || 10;
        this.statePage.set({ pageIndex: page, pageSize });
        this.customerResource.reload();
      }
    });
  }

  public async openModalCreateCustomer() {
    const modalOptions: ModalOptions = {
      width: '400px',
    }
    const dialogRef = openModal(this.dialog, UpsertCustomerDialogComponent, modalOptions);
    const result : null | CreateCustomerDTO = await firstValueFrom(dialogRef.afterClosed());
    if(!result) return;
    this.createCustomer(result);
  }

  public async openModalEditCustomer(customer: Customer) {
    const modalOptions: ModalOptions = {
      width: '400px',
      data: { customer }
    }
    const dialogRef = openModal(this.dialog, UpsertCustomerDialogComponent, modalOptions);
    const result: null | UpdateCustomerDTO = await firstValueFrom(dialogRef.afterClosed());
    if(!result) return;
    this.updateCustomer(customer.id, result);
  }

  public async openModalConfirlDeleteCustomer(customer: Customer) {
    const data : DialogDataConfirm = {
      title: TITLE_DELETE_CUSTOMER_DIALOG,
      message: MESSAGE_DELETE_CUSTOMER_DIALOG,
      titleButtonMain: 'Eliminar',
      tittleButtonSecondary: 'Cancelar',
    }
    const ModalOptions: ModalOptions = {
      width: '400px',
      data,
    }
    const dialogRef = openModal(this.dialog, ConfirmDialogComponent, ModalOptions);
    const result: boolean = await firstValueFrom(dialogRef.afterClosed());
    if(!result) return;
    this.deleteCustomer(customer.id);
  }
  
  public navigateToList() {
    this.router.navigate([CUSTOMER_ROUTE_LIST]);
  }

  public navigateToTable() {
    this.router.navigate([CUSTOMER_ROUTE_TABLE]);
  }

}
