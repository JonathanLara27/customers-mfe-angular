import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderPageComponent } from '../../shared/headerPage/headerPage.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    HeaderPageComponent,
  ],
  providers: [CustomerService],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
})
export default class CustomerTableComponent { 
  
  private readonly customerService = inject(CustomerService);

  private readonly authService = inject(AuthService);

  public title = this.customerService.title;
  public subtitle = this.customerService.subtitle;

  public tooltipAddCustomer = this.customerService.tooltipAddCustomer;

  public rapidSearchPlaceholder = this.customerService.placeHolderSearch;

  public customers = this.customerService.customers;
  public total = this.customerService.total;
  public isLoading = this.customerService.isLoading;
  public error = this.customerService.error;

  public form = this.customerService.form;

  public page = this.customerService.page;
  public pageSize = this.customerService.pageSize;

  public columnsCustomers = this.customerService.columnsCustomers;
  public actionsCustomers = this.customerService.actionsCustomers;

  public currentUser = this.authService.currenUser;

  public titleButtonLogin = this.authService.titleButtonLogin;
  public titleButtonLogout = this.authService.titleButtonLogout;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(TableComponent) tableComponent!: TableComponent;

  ngAfterViewInit(): void {
    this.customerService.setPaginator(this.paginator);
    this.customerService.setTable(this.tableComponent);
    this.customerService.valueChangesPaginator();
  }

  public async openModalCreateCustomer() {
    return this.customerService.openModalCreateCustomer();
  }

  public navigateToListView() {
    return this.customerService.navigateToList()
  }

  public login(){
    return this.authService.login();
  }

  public logout(){
    return this.authService.logout();
  }

}
