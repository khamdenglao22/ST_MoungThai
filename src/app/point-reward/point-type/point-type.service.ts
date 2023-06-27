import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PointTypeService {
  private publicDev = environment.public_dev
  constructor(private httpClient: HttpClient) {}

  findPointType(){
     return this.httpClient.get(`${this.publicDev}/Api/PointType?CompanyId=${1}`)
  }

  createPointType(filter:any){
    return this.httpClient.post(`${this.publicDev}/Api/PointType`, {...filter, CompanyId: 1})
  }

  findPointTypeById(filter:any){
    return this.httpClient.get(`${this.publicDev}/Api/PointType/${filter}`)
  }

  updatePointType(pointTypeId: number | null, data: any) {
    return this.httpClient.put(`${this.publicDev}/Api/PointType/${pointTypeId}`, {...data, CompanyId: 1})
  }

  deletePointType(id:any){
    return this.httpClient.delete(`${this.publicDev}/Api/PointType/${id}`)
  }

}
