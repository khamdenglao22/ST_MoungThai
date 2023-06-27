import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface PushLogResponse {
  totalData: number,
  results: PushLog[],
  limit: number,
  offset: number
}

export interface PushLog {
  id: number,
  title: string,
  body: string,
  push_by: any,
  push_date: Date
}

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  sendPushNotification(data: any) {
    return this.httpClient.post(`${this.url}/api/push-notification`, data)
  }

  getPushLog(offset: number, limit: number) {
    return this.httpClient.get<PushLogResponse>(`${this.url}/api/push-notification/log?offset=${offset}&limit=${limit}`)
  }
}
