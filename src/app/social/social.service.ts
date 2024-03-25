import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  findAllSocial(){
    return this.httpClient.get(`${this.url}/bof/api/social`)
  }

  findSocialById(social_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/social/${social_id}`)
  }

  createSocial(data:any){
    return this.httpClient.post(`${this.url}/bof/api/social`,data)
  }

  updateSocial(data:any, social_id:number | null){
    return this.httpClient.put(`${this.url}/bof/api/social/${social_id}`,data)
  }

  deleteSocial(social_id:number | null){
    return this.httpClient.delete(`${this.url}/bof/api/social/${social_id}`)
  }
}
