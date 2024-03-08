import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerAdvertisingService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllBannerAdvertising(){
    return this.httpClient.get(`${this.url}/backoffice/api/banner-advertising`)
  }

  findAllBannerAdvertisingById(banner_id: number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/banner-advertising/${banner_id}`)
  }

  createNewBannerAdvertising(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/banner-advertising`,data)
  }

  updateBannerAdvertising(data:any,banner_id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/banner-advertising/${banner_id}`,data)
  }

  updateBannerAdvertisingActive(data:any,banner_id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/banner-advertising/update-active/${banner_id}`,data)
  }
}
