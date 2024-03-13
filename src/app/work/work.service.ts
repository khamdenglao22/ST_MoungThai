import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private url = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  findAllWork(){
    return this.httpClient.get(`${this.url}/bof/api/work`)
  }


  findWorkById(work_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/work/${work_id}`)
  }

  createWork(data:any){
    return this.httpClient.post(`${this.url}/bof/api/work`,data)
  }

  updateWork(data:any,work_id:number | null){
    return this.httpClient.put(`${this.url}/bof/api/work/${work_id}`,data)
  }


  findAllApplyWork(){
    return this.httpClient.get(`${this.url}/bof/api/apply-work`)
  }

  deleteWorkById(work_id:number | null){
    return this.httpClient.delete(`${this.url}/bof/api/work/${work_id}`)
  }
}
