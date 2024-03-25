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
    return this.httpClient.get(`${this.url}/bof/api/product`)
  }

  findProductById(p_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/product/${p_id}`)
  }

  createProduct(data:any) {
    return this.httpClient.post(`${this.url}/bof/api/product`,data)
  }

  updateProduct(data:any,p_id:number | null){
    return this.httpClient.put(`${this.url}/bof/api/product/${p_id}`,data)
  }

  deleteProduct(p_id:number | null){
    return this.httpClient.delete(`${this.url}/bof/api/product/${p_id}`)
  }

  searchProduct(data:any){
    return this.httpClient.get(`${this.url}/bof/api/product?p_name=${data.p_name}&p_cate_sub_id=${data.p_cate_sub_id}`)
  }
}
