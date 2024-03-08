import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  findAllCategory(){
    return this.httpClient.get(`${this.url}/backoffice/api/product-category`)
  }

  findCategoryById(cate_id:number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/product-category/${cate_id}`)
  }

  createCategory(data:any) {
    return this.httpClient.post(`${this.url}/backoffice/api/product-category`,data)
  }

  updateCategory(data:any,cate_id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/product-category/${cate_id}`,data)
  }

  deleteCategory(cate_id:number | null){
    return this.httpClient.delete(`${this.url}/backoffice/api/product-category/${cate_id}`)
  }

  


}
