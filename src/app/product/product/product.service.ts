import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  findAllProduct(){
    return this.httpClient.get(`${this.url}/backoffice/api/product`)
  }

  findProductById(p_id:number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/product/${p_id}`)
  }

  createProduct(data:any) {
    return this.httpClient.post(`${this.url}/backoffice/api/product`,data)
  }

  updateProduct(data:any,p_id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/product/${p_id}`,data)
  }

  deleteProduct(p_id:number | null){
    return this.httpClient.delete(`${this.url}/backoffice/api/product/${p_id}`)
  }
}
