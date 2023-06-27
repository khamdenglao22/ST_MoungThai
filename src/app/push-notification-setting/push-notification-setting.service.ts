import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PushNotificationSettingService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAllPushNotificationSetting() {
    return this.httpClient.get(`${this.url}/api/push-notification-setting`)
  }

  findPushNotificationSettingById(id: number) {
    return this.httpClient.get(`${this.url}/api/push-notification-setting/${id}`)
  }

  updatePushNotificationSetting(id: number, data: any) {
    return this.httpClient.put(`${this.url}/api/push-notification-setting/${id}`, data)
  }
}
