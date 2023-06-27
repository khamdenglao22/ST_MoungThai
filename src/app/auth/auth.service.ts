import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(`${this.url}/api/auth/login`, {
      username, password
    }, { "headers": headers });
  }

  
  isLoggedIn() {
    return localStorage.getItem("token") != null;
  }

  getToken() {
    return localStorage.getItem("token")
  }

  decodeToken() {
    const token = this.getToken()
    if (token) {
      return jwt_decode(token) as any;
    }
  }

  removeToken() {
    localStorage.removeItem("token")
  }
}
