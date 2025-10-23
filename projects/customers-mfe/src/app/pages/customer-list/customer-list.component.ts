import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HeaderPageComponent } from '../../shared/headerPage/headerPage.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    HeaderPageComponent,
  ],
  providers: [CustomerService],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export default class CustomerListComponent { 
  
  private readonly customerService = inject(CustomerService);

  public title = this.customerService.title;
  public subtitle = this.customerService.subtitle;

  public customers = this.customerService.customers;
  public total = this.customerService.total;
  public isLoading = this.customerService.isLoading;
  public error = this.customerService.error;

  public form = this.customerService.form;

  public page = this.customerService.page;
  public pageSize = this.customerService.pageSize;

  public columnsCustomers = this.customerService.columnsCustomers;
  public actionsCustomers = this.customerService.actionsCustomers;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.customerService.setPaginator(this.paginator);
    this.customerService.valueChangesPaginator();
  }

  public navigateToTableView() {
    return this.customerService.navigateToTable()
  }
  

}
