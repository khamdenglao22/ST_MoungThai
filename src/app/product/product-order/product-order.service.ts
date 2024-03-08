import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  private url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  findAllProductOrder(){
    return this.httpClient.get(`${this.url}/backoffice/api/product-order`)
  }
}
