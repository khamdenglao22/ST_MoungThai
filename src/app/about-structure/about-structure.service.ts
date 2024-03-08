import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutStructureService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllAboutStructure(){
    return this.httpClient.get(`${this.url}/backoffice/api/about-structure`)
  }

  findAllAboutStructureById(id: number | null){
    return this.httpClient.get(`${this.url}/backoffice/api/about-structure/${id}`)
  }

  createNewAboutStructure(data:any){
    return this.httpClient.post(`${this.url}/backoffice/api/about-structure`,data)
  }

  updateBAboutStructure(data:any,id:number | null){
    return this.httpClient.put(`${this.url}/backoffice/api/about-structure/${id}`,data)
  }

  deleteAboutStructure(id:number | null){
    return this.httpClient.delete(`${this.url}/backoffice/api/about-structure/${id}`)
  }
}
