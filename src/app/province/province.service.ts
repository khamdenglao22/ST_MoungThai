import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private url = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  findAllProvince(){
    return this.httpClient.get(`${this.url}/backoffice/api/province`)
  }

  findProvinceById(prov_cd:any){
    return this.httpClient.get(`${this.url}/backoffice/api/province/${prov_cd}`)
  }

  findAllProvinceByCountry(country_id: number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/province?country_id=${country_id}`)
  }

  createProvince(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/province`,data)
  }

  updateProvince(data:any,prov_cd:any){
    return this.httpClient.put(`${this.url}/backoffice/api/province/${prov_cd}`,data)
  }

}
