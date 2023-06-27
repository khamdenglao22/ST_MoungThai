import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

interface AudtiLogResponse {
  totalResult: number,
  results: AuditLog[],
  limit: number,
  offset: number
}

export interface AuditLog {
  id: number,
  user: string,
  action_detail: string,
  action_date: Date,
  tag: string,
  action_from: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAll(offset: Number, limit: Number, tags: Array<any>) {
    let query = `?limit=${limit}&offset=${offset}`;

    if (tags) {
      query += `&tags=${JSON.stringify(tags)}`;
    }

    return this.httpClient.get<AudtiLogResponse>(`${this.url}/api/audit-log?${query}`)
  }
}
