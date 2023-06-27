import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { LotteryService, company } from '../lottery.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lottery-sales-summary-date',
  templateUrl: './lottery-sales-summary-date.component.html',
  styleUrls: ['./lottery-sales-summary-date.component.scss'],
})
export class LotterySalesSummaryDateComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  limit = 50;
  resultsLength = 0;
  from_date: any = '';
  to_date: any = '';
  company: any = 2;
  loading = false;
  datadate: any = [];
  data: Array<any> = [];
  companies: company[] = [];
  displayedColumns = [
    'TransactionDate',
    'TotalSales',
    'TotalPayment',
    'TotalPaymentbyPoint',
    'TotalPointIssued',
  ];
  submitted = false;
  sumtotalsale = 0;
  sumtotalpayment = 0;
  sumtotalpaymentbypoint = 0;
  sumtotalpointissued = 0;

  // agent = [
  //   { name: 'ຫວຍໂຊກໄຊ', id: 1 },
  //   { name: 'ຫວຍສົມໃຈນຶກ', id: 2 },
  // ];
  constructor(private service: LotteryService) {}

  ngOnInit(): void {
    this.loadData();
    this.service.getCompany().subscribe((res: any) => {
      console.log(res);

      this.companies = res;
    });
  }
  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  loadData() {
    //     this.submitted = true;
    //     this.loading = true;
    //     this.sumtotalsale = 0;
    //     this.sumtotalpayment = 0;
    //     this.sumtotalpaymentbypoint =0;
    //     this.sumtotalpointissued = 0;
    //  this.service.findAllSummaryDate().subscribe((res: any)=>{
    //   this.datadate = res;
    //   this.data = res;
    //   this.loading =false;
    //   this.datadate = new MatTableDataSource(res);
    //   this.datadate.paginator = this.paginator;
    //   this.data.forEach(e=>{
    //     this.sumtotalsale += e.totalsale;
    //     this.sumtotalpayment += e.totalpayment;
    //   this.sumtotalpaymentbypoint += e.totalpaymentbypoint;
    //   this.sumtotalpointissued += e.totalpointissued;
    //   });
    //      });
  }
  onBtnReportClick() {
    this.sumtotalsale = 0;
    this.sumtotalpayment = 0;
    this.sumtotalpaymentbypoint = 0;
    this.sumtotalpointissued = 0;
    this.submitted = true;
    this.loading = true;
    this.service
      .findAllSummaryDateDetails({
        from_date: this.from_date,
        to_date: this.to_date,
        company: this.company,
        limit: 20000,
        offset: 1,
      })
      .subscribe((res: any) => {
        this.datadate = res;
        this.data = res;
        this.loading = false;
        this.datadate = new MatTableDataSource(res);
        this.datadate.paginator = this.paginator;
        this.data.forEach((e) => {
          this.sumtotalsale += e.totalsale;
          this.sumtotalpayment += e.totalpayment;
          this.sumtotalpaymentbypoint += e.totalpaymentbypoint;
          this.sumtotalpointissued += e.totalpointissued;
        });
      });
  }
  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      reportSheet,
      'lottery-sales-summary-date'
    );
    let filename = 'lottery-sales-summary-date';
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

      td, th  {
        padding: 5px;
      }
    </style>`;

    htmlToPrint += divToPrint?.outerHTML;
    let newWin = window.open('');
    newWin?.document.write(htmlToPrint);
    newWin?.print();
    newWin?.close();
    if (divToPrint) {
      divToPrint.style.display = 'none';
    }
  }
}

export interface datadate {
  drawdate: string;
  Company: string;
  totalsale: number;
  totalpayment: number;
  totalpaymentbypoint: number;
  totalpointissued: number;
}
