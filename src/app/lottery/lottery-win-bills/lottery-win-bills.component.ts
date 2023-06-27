import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { LotteryService } from '../lottery.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lottery-win-bills',
  templateUrl: './lottery-win-bills.component.html',
  styleUrls: ['./lottery-win-bills.component.scss']
})
export class LotteryWinBillsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : ''
  lottoId: any;
  from_date: any="";
  to_date: any="";
  draw: any="";
  limit: 50;
resultsLength = 0;
loading =  false;
submitted = false;
dataSource :any =[];
data :Array<any>=[];
displayedColumns = ['Draw','TransactionDate', 'TotalSales', 'TotalPayment', 'TotalPaymentbyPoint', 'TotalPointIssued','TotalWinAmount'];
drawComplete = false;
drawArr: Array<any> = [];
sumtotalsale = 0;
sumtotalpayment = 0;
sumtotalpaymentbypoint = 0;
sumtotalpointissued = 0;
sumtotalwin = 0;

  constructor(private service: LotteryService) { }

  ngOnInit(): void {
    this.loadData()
      this.service.getLottoId().subscribe((res:any)=>{
this.lottoId = res
  })
  }

  private loadData() {
//     this.submitted = true;
//     this.loading = true;
//     this.sumtotalsale = 0;
//     this.sumtotalpayment = 0;
//     this.sumtotalpaymentbypoint =0;
//     this.sumtotalpointissued = 0;
//     this.sumtotalwin = 0
//   this.service.getLottoId().subscribe((res:any)=>{
// this.lottoId = res
//   })

//  this.service.findWinSummary().subscribe((res: any)=>{
//   this.dataSource = res;
//   this.data = res;
//   this.loading =false;
//   this.dataSource = new MatTableDataSource(res);
//   this.dataSource.paginator = this.paginator;
//   this.data.forEach(e=>{
//     this.sumtotalsale += e.totalSale;
//     this.sumtotalpayment += e.bankPayAmt;
//   this.sumtotalpaymentbypoint += e.pointPayAmt;
//   this.sumtotalpointissued += e.totalPointIssued;
//   this.sumtotalwin += e.totalWinAmount;
//   });


//      });

    }


   formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
   onBtnReportClick() {

    this.submitted = true;
    this.loading = true;
    this.sumtotalsale = 0;
    this.sumtotalpayment = 0;
    this.sumtotalpaymentbypoint =0;
    this.sumtotalpointissued = 0;
    this.sumtotalwin = 0

    this.service.findWinSummaryFilter({
      from_date: this.from_date,
      to_date: this.to_date,
      draw: this.draw,
      limit: 20000,
      offset: 1
    }).subscribe((res: any)=>{
      this.dataSource = res;
      this.data = res;
      this.loading =false;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.data.forEach(e=>{
        this.sumtotalsale += e.totalSale;
        this.sumtotalpayment += e.bankPayAmt;
      this.sumtotalpaymentbypoint += e.pointPayAmt;
      this.sumtotalpointissued += e.totalPointIssued;
      this.sumtotalwin += e.totalWinAmount;
      });


         });


  }
  // setAlldraw(isChecked: boolean) {
  //   if (isChecked) {
  //     this.form.get('drawStatus')?.setValue(this.draw);
  //     this.drawArr = this.draw.map((item) => {
  //       return item.id;
  //     });
  //     this.draw;
  //   } else {
  //     this.drawArr = [];
  //     this.form.get('drawStatus')?.setValue([]);
  //   }
  // }
  exportToExcel(){
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'lottery-win-summary');

    let filename = 'lottery-win-summary';
    XLSX.writeFile(workbook, `${filename}.xlsx`);

  }
  print() {
    var divToPrint = document.getElementById('report');
    var htmlToPrint = `
    <style type="text/css">

    table, td, th  {

      border: 1px solid #000;
      border-collapse: collapse;

    }
    table{
      width: 100%;
      font-family:  Saysettha OT ;
    }
    td, th  {
      padding: 5px;
      text-align: center;
    }
  </style>`;
    htmlToPrint += divToPrint?.outerHTML;
    let newWin = window.open('');
    newWin?.document.write(htmlToPrint);
    newWin?.print();
    newWin?.close();
  }
}






  // const edata: User[] = [
  //   {
  // "draw": "20313",
  // "transactiondate": "03-03-2023",
  // "totalsale": 50000000,
  // "totalpayment": 45000000,
  // "totalpaymentbypoint": 5000000,
  // "totalpointissued":5000000,
  // "totalwinamount":15000000
  //   },
  //   {
  //     "draw": "20314",
  //     "transactiondate": "05-03-2023",
  //     "totalsale": 30000000,
  //     "totalpayment": 25000000,
  //     "totalpaymentbypoint": 3000000,
  //     "totalpointissued":3000000,
  // "totalwinamount":7000000

  //       }

  //   ];


