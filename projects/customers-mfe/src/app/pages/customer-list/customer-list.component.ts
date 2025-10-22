import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [CustomerService],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent { 

  private readonly customerService = inject(CustomerService);


  public customers = this.customerService.customers;
  public total = this.customerService.total;
  public isLoading = this.customerService.isLoading;
  public error = this.customerService.error;

  public page = this.customerService.page;
  public pageSize = this.customerService.pageSize;

  public columnsCustomers = this.customerService.columnsCustomers;
  public actionsCustomers = this.customerService.actionsCustomers;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(TableComponent) tableComponent!: TableComponent;

  ngAfterViewInit(): void {
    this.customerService.setPaginator(this.paginator);
    this.customerService.setTable(this.tableComponent);
    this.customerService.valueChangesPaginator();
  }
  

}
