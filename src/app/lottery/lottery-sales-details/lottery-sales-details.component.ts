import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LotteryService, saledetail } from '../lottery.service';
import { MatTableDataSource } from '@angular/material/table';
import { SaleDetailsParentComponent } from './sale-details-parent/sale-details-parent.component';

@Component({
  selector: 'app-lottery-sales-details',
  templateUrl: './lottery-sales-details.component.html',
  styleUrls: ['./lottery-sales-details.component.scss']
})
export class LotterySalesDetailsComponent implements OnInit {
//@ViewChild('myDialog') Dialog = {} as TemplateRef<>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  from_date: any="";
  to_date: any="";
  billno: any="";
ticketid: string ="";
data :any =[];
  resultsLength : number;
  limit : number;
  loading = false;
  dialogRef: any;
  submitted = false;
  drawComplete = false;
displayedColumns : string[] = ['Billno','OrderDate', 'Draw', 'DrawDate', 'PaymentType', 'PaymentAmount', 'Customers','Phone','Action'];
// data: MatTableDataSource<saledetail>;
  constructor(public dialog: MatDialog, private service: LotteryService)
  {

  }

  ngOnInit(): void {
    this.loadData();

  }
  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  openDialog(element: any): void {
    let dialogRef = this.dialog.open(SaleDetailsParentComponent, {

      width: '500px',
       height: '500px',

      panelClass: 'my-dialog',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  loadData() {

    // this.submitted = true;
    // this.loading = true;
    // this.service.findAllSale().subscribe((res: any)=>{
    //  this.data = res
    //  this.loading =false;
    //  this.data = new MatTableDataSource(res);
    //  this.data.paginator = this.paginator;
    //     });

  }

  onBtnReportClick() {

    this.submitted = true;
    this.loading = true;
    this.service.findAllSaleDetails(
      {
        from_date: this.from_date,
        to_date: this.to_date,
        billno: this.billno,
        limit: 20000,
        offset: 1

      }).subscribe((res: any)=>{
     this.data = res
     this.loading =false;
     this.data = new MatTableDataSource(res);
     this.data.paginator = this.paginator;
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
  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, reportSheet, 'lottery-sales-details');
    let filename = 'lottery-sales-details';
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
    let newWin = window.open("");
    newWin?.document.write(htmlToPrint);
    newWin?.print();
    newWin?.close();
    if (divToPrint) {
      divToPrint.style.display = "none";
    }
  }

}



