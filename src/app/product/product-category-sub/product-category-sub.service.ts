import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategorySubService {
  private url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  findAllCategorySub(){
    return this.httpClient.get(`${this.url}/backoffice/api/product-category-sub`)
  }

  findCategorySubById(sub_id:number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/product-category-sub/${sub_id}`);
  }

  createCategorySub(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/product-category-sub/`,data);
  }

  updateCategorySub(data:any, sub_id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/product-category-sub/${sub_id}`,data);
  }

  deleteCategorySub(sub_id:number | null){
    return this.httpClient.delete(`${this.url}/backoffice/api/product-category-sub/${sub_id}`);
  }

}
