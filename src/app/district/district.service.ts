import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private url = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  findAllDistrict(){
    return this.httpClient.get(`${this.url}/backoffice/api/district`)
  }

  findDistrictById(dist_cd:any){
    return this.httpClient.get(`${this.url}/backoffice/api/district/${dist_cd}`)
  }

  createDistrict(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/district`,data)
  }

  updateDistrict(data:any,dist_cd:any){
    return this.httpClient.put(`${this.url}/backoffice/api/district/${dist_cd}`,data)
  }
}
