import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  rewardSummary(filter: any) {
    const { from_date, to_date, product } = filter;
    return this.httpClient.post(`${this.url}/Api/RewardBof/RewardSummary`, filter);
  }

  // rewardSummary(){
  //   this.httpClient.post<any>(`${this.url}/RewardBof/RewardSummary`, { title: 'Angular POST Request Example' }).subscribe(data => {
  //     console.log(data);

  // })

  // }

  rewardPayoutSummary(filter: any) {
    const { from_date, to_date } = filter;
    return this.httpClient.get(
      `${this.url}/Api/RewardBof/RewardPayoutSummary?StartDate=${from_date}&EndDate=${to_date}&AppName=SXALL&Offset=0&Limit=1000000000`
    );
  }

  rewardBalance(filter: any) {
    const { offset, limit } = filter;

    return this.httpClient.get(
      `${this.url}/Api/RewardBof/RewardBalance?AppName=SXALL&Offset=${offset}&Limit=${limit}`
    );
  }

  rewardBalanceFilter(filter: any) {
    const {firstname,phone, offset, limit } = filter;

    return this.httpClient.get(
      `${this.url}/Api/RewardBof/RewardBalance?AppName=SXALL&Offset=${offset}&Limit=${limit}&firstname=${firstname}&phone=${phone}`
    );
  }


  rewardProductType(filter: any) {
    return this.httpClient.get(
      `${this.url}/Api/RewardBof/RewardProductType?AppName=${filter}`
    );
  }

  findRewardHistory(filter:any){
    return this.httpClient.post(`${this.url}/Api/RewardBof/RewardTransaction`,filter)
  }

  findAllPayoutDetail(filter: any) {
    const {offset, limit, phone, startDate, endDate } = filter;
    const parameter = `?Offset=${offset}&Limit=${limit}&AppName=SXALL&RewardPhone=${phone}&StartDate=${startDate}&EndDate=${endDate}`;
    return this.httpClient.get(`${this.url}/Api/RewardBof/RewardPayoutDetail${parameter}`);
  }

  createPayoutDetail(payoutDetail: any) {
    return this.httpClient.post(`${this.url}/Api/RewardBof/RewardPayoutDetail`, payoutDetail);
  }

  // reward type

  getRewardAge() {
    return this.httpClient.get(`${this.url}/Api/RewardAge?CompanyId=1`);
  }

  updateRewardAge(data: any) {
    return this.httpClient.put(`${this.url}/Api/RewardAge/${data.RewardAgeId}`, data);
  }

  findRewardType(){
    return this.httpClient.get(`${this.url}/Api/RewardType?CompanyId=${1}`)
  }

  createRewardType(data:any){
    return this.httpClient.post(`${this.url}/Api/RewardType`, {...data, companyId: 1})
  }

  findRewardTypeById(id:any){
    return this.httpClient.get(`${this.url}/Api/RewardType/${id}`)
  }

  updateRewardType(pointTypeId: number | null, data: any) {
    return this.httpClient.put(`${this.url}/Api/RewardType/${pointTypeId}`, {...data, companyId: 1})
  }

  deleteRewardType(id:any){
    return this.httpClient.delete(`${this.url}/Api/RewardType/${id}`)
  }
}
