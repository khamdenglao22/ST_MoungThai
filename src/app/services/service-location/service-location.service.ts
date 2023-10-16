import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocationService {

  private url = environment.apiUrl

  constructor(private httpClient: HttpClient) { }


  findAllLocation(){
    return this.httpClient.get(`${this.url}/backoffice/api/service-location`)
  }

  findLocationById(service_location_id:number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/service-location/${service_location_id}`)
  }

  createLocation(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/service-location`,data)
  }

  updateLocation(data:any, service_location_id:number|null){
    return this.httpClient.put(`${this.url}/backoffice/api/service-location/${service_location_id}`,data)
  }

}
