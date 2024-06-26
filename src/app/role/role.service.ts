import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllRole() {
    return this.httpClient.get(`${this.url}/bof/api/role`)
  }

  findRoleById(roleId: number) {
    return this.httpClient.get(`${this.url}/bof/api/role/${roleId}`)
  }

  deleteRole(roleId: number) {
    return this.httpClient.delete(`${this.url}/bof/api/role/${roleId}`)
  }

  createRole(data: any) {
    return this.httpClient.post(`${this.url}/bof/api/role`, data)
  }

  updateRole(roleId: number, data: any) {
    return this.httpClient.put(`${this.url}/bof/api/role/${roleId}`, data)
  }
}
