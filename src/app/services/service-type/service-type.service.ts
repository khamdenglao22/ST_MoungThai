import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllServiceType(){
    return this.httpClient.get(`${this.url}/backoffice/api/service-type`)
  }

  findServiceTypeById(type_id:number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/service-type/${type_id}`)
  }

  createServiceType(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/service-type`,data)
  }

  updateServiceType(data:any,type_id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/service-type/${type_id}`,data)
  }

}
