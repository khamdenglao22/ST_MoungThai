import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  private url = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  findAllVillage(){
    return this.httpClient.get(`${this.url}/bof/api/village`)
  }

  findVillageById(vill_cd:any){
    return this.httpClient.get(`${this.url}/bof/api/village/${vill_cd}`)
  }

  createVillage(data:any){
    return this.httpClient.post(`${this.url}/bof/api/village`,data)
  }

  updateVillage(data:any,vill_cd:any){
    return this.httpClient.put(`${this.url}/bof/api/village/${vill_cd}`,data)
  }
}
