import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
private url = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  findAllProvince(){
    return this.httpClient.get(`${this.url}/bof/api/province`)
  }

  findAllDistrict(prov_cd: string) {
    return this.httpClient.get(`${this.url}/bof/api/district?prov_cd=${prov_cd}`)
  }

  findAllVillage(dist_cd: string) {
    return this.httpClient.get(`${this.url}/bof/api/village?dist_cd=${dist_cd}`)
  }

}
