import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { ApiCustomerService } from './api-customer.service';
import { firstValueFrom } from 'rxjs';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { COLUMNS_CUSTOMERS } from '../../shared/constants';
import { ButtonColumn } from '../../shared/table/table.interface';
@Injectable()
export class CustomerService {

  private readonly apiCustomerService = inject(ApiCustomerService);

  private fb = inject(FormBuilder);
  private statePage = signal<{ pageIndex: number; pageSize: number }>({ pageIndex: 0, pageSize: 5 });
  
  private customerResource = resource({
    loader: async () => await firstValueFrom(this.apiCustomerService.getCustomers(this.statePage().pageIndex, this.statePage().pageSize)),
  })


  private tableComponent: TableComponent | null = null;
  private paginator: MatPaginator | null = null;
  
  constructor() { 
    this.valueChangesSearchForm();
  }
  public customers = computed(() => this.customerResource.value()?.data ?? []);
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
        action: (row: any) => {
          console.log('Editar cliente:', row);
        },
        label: (row: any) => 'Editar',
        icon: (row: any) => 'edit',
        show: (row: any) => true,
      },
      {
        action: (row: any) => {
          console.log('Eliminar cliente:', row);
        },
        label: (row: any) => 'Eliminar',
        icon: (row: any) => 'delete',
        buttonClass: 'mat-warn',
        show: (row: any) => true,
      }
    ]
  }));


  public form = this.fb.nonNullable.group({
    search: [''],
  });

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
        console.log("🚀 ~ CustomerService ~ valueChangesPaginator ~ event:", event)
        const page = (event.pageIndex  || 0) + 1;
        const pageSize = event.pageSize || 10;
        this.statePage.set({ pageIndex: page, pageSize });
        this.customerResource.reload();
      }
    });
  }

  private valueChangesSearchForm() {
    this.form.get('search')?.valueChanges.subscribe({
      next: (value) => {
        if(!value || !this.tableComponent) return;
        const normalizeValue = value.trim().toLowerCase();
        this.tableComponent.setFilter(normalizeValue);
      }
    });
  }
  

}
