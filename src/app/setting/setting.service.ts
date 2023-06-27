import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllSetting() {
    return this.httpClient.get(`${this.url}/api/config`)
  }

  updateSetting(data: any) {
    return this.httpClient.put(`${this.url}/api/config`, data)
  }
}
