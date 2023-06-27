import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface CustomerResponse {
  totalCustomer: number,
  results: Customer[],
  limit: number,
  offset: number
}

export interface Customer {
  id: number,
  firstname: string,
  lastname: string,
  phone: string,
  email: string,
  dob: Date,
  gender: string,
  image: string,
  active: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllCustomer(query: any) {
    let { offset, limit, phone } = query;
    return this.httpClient.get<CustomerResponse>(`${this.url}/api/customer?phone=${phone}&offset=${offset}&limit=${limit}`);
  }

  findCustomerById(id: number) {
    return this.httpClient.get(`${this.url}/api/customer/${id}`)
  }

  updateCustomer(id: number, data: any) {
    return this.httpClient.put(`${this.url}/api/customer/${id}`, data)
  }
}
