import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceCountryService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllServiceCountry(){
    return this.httpClient.get(`${this.url}/bof/api/service-country`)
  }

  findAllServiceCountryOnChange(service_type_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/service-country?service_type_id=${service_type_id}`)
  }

  findServiceCountryById(country_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/service-country/${country_id}`)
  }

  createServiceCountry(data:any){
    return this.httpClient.post(`${this.url}/bof/api/service-country`,data)
  }

  updateServiceCountry(data:any,country_id:number | null){
    return this.httpClient.put(`${this.url}/bof/api/service-country/${country_id}`,data)
  }
}
