import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  findAllDashboardData(limit: number, offset: number) {
    return this.httpClient.get<Response>(
      `${this.url}/api/dashboard?limit=${limit}&offset=${offset}`
    );
  }
}
