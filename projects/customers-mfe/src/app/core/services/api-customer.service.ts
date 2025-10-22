import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINT_CUSTOMERS } from '../../shared/constants';
import { map, Observable } from 'rxjs';
import { CreateCustomerDTO, Customer, CustomerResponse } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {

  private readonly http = inject(HttpClient);
  private baseUrl = ENDPOINT_CUSTOMERS;

  constructor() { }


  getCustomers(page: number, limit: number): Observable<CustomerResponse> {
    let params = new HttpParams()
      .set('_page', String(page))
      .set('_limit', String(limit));
    return this.http.get<Customer[]>(`${this.baseUrl}`, { observe: 'response', params })
      .pipe(
        map(resp => {
          const total = Number(resp.headers.get('X-Total-Count') ?? resp.body?.length ?? 0);
          return { data: resp.body ?? [], total };
        })
      );
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  createCustomer(data: CreateCustomerDTO) {
    return this.http.post<Customer>(`${this.baseUrl}`, data);
  }

  patchCustomer(id: number, data: Partial<CreateCustomerDTO>) {
    return this.http.patch<Customer>(`${this.baseUrl}/${id}`, data);
  }

}
