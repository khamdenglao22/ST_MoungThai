import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { LotteryService, company } from '../lottery.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-lottery-sales-summary-draw',
  templateUrl: './lottery-sales-summary-draw.component.html',
  styleUrls: ['./lottery-sales-summary-draw.component.scss']
})
export class LotterySalesSummaryDrawComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  limit = 50;
  resultsLength = 0;
  from_date: any="";
to_date: any="";
draw: any="";
lottoId: any;
  loading =  false;
dataSource :any =[];
data :Array<any>=[];
companies: company[]=[];
company: any="";
displayedColumns = ['Draw','TransactionDate', 'TotalSales', 'TotalPayment', 'TotalPaymentbyPoint', 'TotalPointIssued'];
submitted = false;
drawComplete = false;
drawArr: Array<any> = [];
sumtotalsale = 0;
sumtotalpayment = 0;
sumtotalpaymentbypoint = 0;
sumtotalpointissued = 0;


// draw = [
//   { name: '20313', id: 1 },
//   { name: '20314', id: 2 },
//   { name: '20315', id: 3 },
//   { name: '20316', id: 4 },
// ];
  constructor( private service: LotteryService ,) { }

  ngOnInit(): void {
    this.loadData();
  this.service.getLottoId().subscribe((res:any)=>{
this.lottoId = res

  });
  this.service.getCompany().subscribe((res: any)=>{
    this.companies = res

       });
  }

  form: FormGroup = new FormGroup({
    draw: new FormControl([]),
    from_date: new FormControl(null, Validators.required),
    to_date: new FormControl(null, Validators.required),

   });
   loadData() {
//     this.submitted = true;
//     this.loading = true;
//     this.sumtotalsale = 0;
//     this.sumtotalpayment = 0;
//     this.sumtotalpaymentbypoint =0;
//     this.sumtotalpointissued = 0;



//  this.service.findAllSummaryDraw().subscribe((res: any)=>{
//   this.dataSource = res;
//   this.data = res;
//   this.loading =false;
//   this.dataSource = new MatTableDataSource(res);
//   this.dataSource.paginator = this.paginator;
//   this.data.forEach(e=>{
//     this.sumtotalsale += e.totalsale;
//     this.sumtotalpayment += e.totalpayment;
//   this.sumtotalpaymentbypoint += e.totalpaymentbypoint;
//   this.sumtotalpointissued += e.totalpointissued;
//   });


//      });

    }
    formatCurrency(data: number) {
      return Number(data).toLocaleString();
    }
   onBtnReportClick() {

    this.sumtotalsale = 0;
    this.sumtotalpayment = 0;
    this.sumtotalpaymentbypoint =0;
    this.sumtotalpointissued = 0;
        this.submitted = true;
        this.loading = true;
        this.service.findAllSummaryDrawDetails({
          from_date: this.from_date,
          to_date: this.to_date,
          draw: this.draw,
          company: this.company,
          limit: 20000,
          offset: 1
        }).subscribe((res: any)=>{
         this.dataSource = res;
         this.data = res;
         this.loading =false;
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
      this.data.forEach(e=>{
        this.sumtotalsale += e.totalsale;
        this.sumtotalpayment += e.totalpayment;
      this.sumtotalpaymentbypoint += e.totalpaymentbypoint;
      this.sumtotalpointissued += e.totalpointissued;
      });



            });



  }
  // calculateTotal(){
  //   return this.dataSource.reduce((accum, curr) => accum + curr.totalsale, 0);
  // }

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
  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'lottery-sales-summary-draw');
    let filename = 'lottery-sales-summary-draw';
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

  .icon{
      display: none;
    }

    .queue-detail-row{
      display: none;
    }
  </style>`;
    htmlToPrint += divToPrint?.outerHTML;
    let newWin = window.open('');
    newWin?.document.write(htmlToPrint);
    newWin?.print();
    newWin?.close();
  }
}

export interface drawdata{
  draw:string;
  drawdate: string;
  totalsale: number;
  totalpayment: number;
  totalpaymentbypoint: number;
  totalpointissued: number;

  }


// const edata: User[] = [
//   {
// "draw": "20313",
// "transactiondate": "03-03-2023",
// "totalsale": 50000000,
// "totalpayment": 45000000,
// "totalpaymentbypoint": 5000000,
// "totalpointissued":5000000,
//   },
//   {
//     "draw": "20314",
//     "transactiondate": "05-03-2023",
//     "totalsale": 30000000,
//     "totalpayment": 25000000,
//     "totalpaymentbypoint": 3000000,
//     "totalpointissued":3000000,
//       }

//   ];



