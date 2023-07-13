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
    return this.httpClient.get(`${this.url}/Api/user`)
  }

  findUserByIdOrUsername(data: string | number) {
    return this.httpClient.get(`${this.url}/Api/user/${data}`)
  }

  createUser(data: any) {
    return this.httpClient.post(`${this.url}/Api/user`, data)
  }

  updateUser(userId: number | null, data: any) {
    return this.httpClient.put(`${this.url}/Api/user/${userId}`, data)
  }

  changePassword(userId: number | null, data: any) {
    return this.httpClient.put(`${this.url}/Api/user/${userId}/change-password`, data)
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(`${this.url}/Api/user/${userId}`)
  }

  updateUserDeviceToken(userId: number, registration_token: string) {
    return this.httpClient.put(`${this.url}/Api/user/${userId}/device-token`, { registration_token })
  }
}
