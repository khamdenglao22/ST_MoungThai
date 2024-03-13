import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsActivityService {
  private url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  findAllNews(){
    return this.httpClient.get(`${this.url}/bof/api/news?page=0&size=50`)
  }

  findNewsById(news_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/news/${news_id}`)
  }

  createNews(data:any){
    return this.httpClient.post(`${this.url}/bof/api/news`,data)
  }

  updateNews(data:any, news_id:number | null){
    return this.httpClient.put(`${this.url}/bof/api/news/${news_id}`,data)
  }

  findGalleryByNewsId(news_id:number | null){
    return this.httpClient.get(`${this.url}/bof/api/news-gallery/${news_id}`)
  }

  createGallery(data:any){
    return this.httpClient.post(`${this.url}/bof/api/news-gallery`,data)
  }

  deleteGallery(gallery_id:number | null){
    return this.httpClient.delete(`${this.url}/bof/api/news-gallery/${gallery_id}`)
  }

  updateNewsActive(news_id:any, data:any){
    return this.httpClient.put(`${this.url}/bof/api/news/update-active/${news_id}`,data)
  }

}
