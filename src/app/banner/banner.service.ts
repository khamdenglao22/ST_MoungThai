import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllBanner(){
    return this.httpClient.get(`${this.url}/backoffice/api/banner`)
  }

  findAllBannerById(banner_id: number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/banner/${banner_id}`)
  }

  createNewBanner(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/banner`,data)
  }

  updateBanner(data:any,banner_id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/banner/${banner_id}`,data)
  }

}
