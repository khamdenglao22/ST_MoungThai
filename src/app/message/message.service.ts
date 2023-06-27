import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  findAllConversation(offset: Number, limit: Number) {
    let query = `limit=${limit}&offset=${offset}`
    return this.httpClient.get(`${this.url}/api/chat?${query}`)
  }

  findConversationDetail(conversationId: number, offset: Number, limit: Number) {
    let query = `limit=${limit}&offset=${offset}`
    return this.httpClient.get(`${this.url}/api/chat/${conversationId}/detail?${query}`)
  }

  sendMessage(data: any) {
    return this.httpClient.post(`${this.url}/api/chat/send`, data)
  }
}
