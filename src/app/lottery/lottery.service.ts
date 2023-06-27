import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface company{
  companyId: number
  companyName: string
  createdAt: Date
  editedAt: Date
  appName: string
}

export interface saledetail {
  ticket_id:string
  order_date:string
  lot_id:number
  draw_date:string
  Paid_by:string
  total_amount:number
  Name:string
  phone:string
  saleDetails : details[];
}



export class details{
  ticket_id :string
  order_date: string
  lot_id : number
  mluckynumber : number
  mamount: number
  winamt: number
}


export interface datawin{
  lotId:string;
  drawDate: string;
  totalSale: number;
  bankPayAmt: number;
  pointPayAmt: number;
  totalPointIssued: number;
  totalWinAmount: number;
}

interface WinResponse {
  total:number,
  data: datawin[],
}



@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  private url = environment.public_dev;
  constructor(
    private httpClient: HttpClient
  ) { }

  findAllSaleDetails(filter:any) {
    const { billno, from_date, to_date, limit, offset } = filter;
    return this.httpClient.get(`${this.url}/Api/LottoBof/SaleLottoDetails?billno=${billno}&from_date=${from_date}&to_date=${to_date}&limit=${limit}&offset=${offset}` );
  }

  findAllSale() {
    return this.httpClient.get(`${this.url}/Api/LottoBof/SaleLottoDetails` );
  }

  findAllSummaryDate() {
    //let {from_date="", to_date="", company="", limit, offset} = filter;
    return this.httpClient.get(`${this.url}/Api/LottoBof/SaleSummaryDate` );
  }

  findAllSummaryDraw() {

    return this.httpClient.get(`${this.url}/Api/LottoBof/SaleSummaryDraw` );
  }

  findAllSummaryDrawDetails(filter:any) {
    const {company,draw, from_date, to_date, limit, offset } = filter;
    return this.httpClient.get(`${this.url}/Api/LottoBof/SaleSummaryDraw?company=${company}&draw=${draw}&from_date=${from_date}&to_date=${to_date}&limit=${limit}&offset=${offset}` );
  }

  getCompany(){
    return this.httpClient.get(`${this.url}/Api/LottoBof/Company`);
  }

  getLottoId(){
    return this.httpClient.get(`${this.url}/Api/LottoBof/LottoId`);
  }

  findAllSummaryDateDetails(filter:any) {
    const {company, from_date, to_date, limit, offset } = filter;
    return this.httpClient.get(`${this.url}/Api/LottoBof/SaleSummaryDate?company=${company}&from_date=${from_date}&to_date=${to_date}&limit=${limit}&offset=${offset}` );
  }

  findWinSummary() {
    // let { limit, offset} = filter;
    return this.httpClient.get(`${this.url}/Api/LottoBof/WinSummary`);
  }

  findWinSummaryFilter(filter:any) {
    const {draw, from_date, to_date, limit, offset } = filter;
    return this.httpClient.get(`${this.url}/Api/LottoBof/WinSummary?draw=${draw}&from_date=${from_date}&to_date=${to_date}&limit=${limit}&offset=${offset}` );
  }


  findAllWinDetailsFilter(filter:any) {
    const {billno, draw, from_date, to_date, limit, offset } = filter;

    return this.httpClient.get(`${this.url}/Api/LottoBof/LottoWinDetails?billno=${billno}&draw=${draw}&from_date=${from_date}&to_date=${to_date}&limit=${limit}&offset=${offset}` );
  }

  findAllWinDetails() {

    return this.httpClient.get(`${this.url}/Api/LottoBof/LottoWinDetails` );
  }
}

