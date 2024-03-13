import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocationMapService {
  private url = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  findAllMap(){
    return this.httpClient.get(`${this.url}/bof/api/location-map`)
  }

  findMapById(map_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/location-map/${map_id}`)
  }

  createMap(data:any){
    return this.httpClient.post(`${this.url}/bof/api/location-map`,data)
  }

  updateMap(data:any,map_id:number | null){
    return this.httpClient.put(`${this.url}/bof/api/location-map/${map_id}`,data)
  }
}
