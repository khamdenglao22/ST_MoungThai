import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllMenu() {
    return this.httpClient.get(`${this.url}/api/menu`)
  }
}
