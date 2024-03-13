import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllUser() {
    return this.httpClient.get(`${this.url}/bof/api/user`)
  }

  findUserByIdOrUsername(data: string | number) {
    return this.httpClient.get(`${this.url}/bof/api/user/${data}`)
  }

  createUser(data: any) {
    return this.httpClient.post(`${this.url}/bof/api/user`, data)
  }

  updateUser(userId: number | null, data: any) {
    return this.httpClient.put(`${this.url}/bof/api/user/${userId}`, data)
  }

  changePassword(userId: number | null, data: any) {
    return this.httpClient.put(`${this.url}/bof/api/user/change-password/${userId}`, data)
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(`${this.url}/bof/api/user/${userId}`)
  }

}
