import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointRewardService {
  private publicDev = environment.public_dev

  constructor(
    private httpClient: HttpClient
  ) { }

  findPointProduct(filter:any){
    let {AppName} = filter
    return this.httpClient.get(`${this.publicDev}/Api/PointBof/PointProductType?AppName=${AppName}`)
  }

  findPointBalance(filter:any){
    return this.httpClient.post(`${this.publicDev}/Api/PointBof/PointBalance`,filter)
  }

  findRewardHistory(filter:any){
    return this.httpClient.post(`${this.publicDev}/Api/RewardBof/RewardTransaction`,filter)
  }

  findRewardProduct(filter:any){
    let{AppName} = filter
    return this.httpClient.get(`${this.publicDev}/Api/RewardBof/RewardProductType?AppName=${AppName}`)
  }

  findPointProductType(data:any){
    return this.httpClient.get(`${this.publicDev}/Api/PointBof/PointProductType?AppName=${data}`)
  }

  findIssuedUsed(data:any){
    return this.httpClient.post(`${this.publicDev}/Api/PointBof/PointIssuedUsage`,data)
  }

  createPayoutDetail(payoutDetail: any) {
    return this.httpClient.post(`${this.publicDev}/Api/RewardBof/RewardPayoutDetail`, payoutDetail);
  }

  findAllPayoutDetail(filter: any) {
    const {offset, limit, phone, startDate, endDate } = filter;
    const parameter = `?Offset=${offset}&Limit=${limit}&AppName=SXALL&RewardPhone=${phone}&StartDate=${startDate}&EndDate=${endDate}`;
    return this.httpClient.get(`${this.publicDev}/Api/RewardBof/RewardPayoutDetail${parameter}`);
  }

  getRewardAge() {
    return this.httpClient.get(`${this.publicDev}/Api/RewardAge?CompanyId=1`);
  }

  updateRewardAge(data: any) {
    return this.httpClient.put(`${this.publicDev}/Api/RewardAge/${data.RewardAgeId}`, data);
  }

}
