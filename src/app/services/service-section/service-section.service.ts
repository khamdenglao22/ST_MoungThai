import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceSectionService {
  private url = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  findAllSection(){
    return this.httpClient.get(`${this.url}/bof/api/service-section`)
  }

  findAllSectionOnChange(service_country_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/service-section?service_country_id=${service_country_id}`)
  }

  findSectionById(service_section_id:number|null){
    return this.httpClient.get(`${this.url}/bof/api/service-section/${service_section_id}`)
  }

  createSection(data:any){
    return this.httpClient.post(`${this.url}/bof/api/service-section`,data)
  }

  updateSection(data:any, service_section_id:number|null){
    return this.httpClient.put(`${this.url}/bof/api/service-section/${service_section_id}`,data)
  }
}
