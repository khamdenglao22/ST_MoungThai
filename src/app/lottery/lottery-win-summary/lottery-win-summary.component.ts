import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import { LotteryService } from '../lottery.service';
import { WinDetailsParentComponent } from './win-details-parent/win-details-parent.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-lottery-win-summary',
  templateUrl: './lottery-win-summary.component.html',
  styleUrls: ['./lottery-win-summary.component.scss']
})
export class LotteryWinSummaryComponent implements OnInit {

  // @ViewChild('myDialog') Dialog = {} as TemplateRef<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  from_date: any="";
  to_date: any="";
  draw: any="";
  billno: any="";
  lottoId: any;
  limit = 50;
  resultsLength = 0;
  loading =  false;
  dialogRef: any;
  submitted = false;
  drawComplete = false;
  dataSource : any =[];
displayedColumns = ['Billno','OrderDate', 'Draw', 'DrawDate', 'PaymentType', 'PaymentAmount','WinAmount', 'Customers','Phone','Action'];

  drawArr: Array<any> = [];


  // draw = [
  //   { name: '20313', id: 1 },
  //   { name: '20314', id: 2 },
  //   { name: '20315', id: 3 },
  //   { name: '20316', id: 4 },
  // ];
  constructor(public dialog: MatDialog, private service: LotteryService)
  {

  }

  ngOnInit(): void {
    this.loadData();
    this.service.getLottoId().subscribe((res: any)=>{
     this.lottoId = res
           });
  }
  // openDialog() {
  //   this.dialogRef = this.dialog.open(this.Dialog);
  // }


  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
  loadData() {

    // this.submitted = true;
    // this.loading = true;
    // this.service.getLottoId().subscribe((res: any)=>{
    //  this.lottoId = res



    //     this.submitted = true;
    //     this.service.findAllWinDetails().subscribe((res: any)=>{
    //      this.dataSource = res
    //      this.loading =false;
    //      this.dataSource = new MatTableDataSource(res);
    //      this.dataSource.paginator = this.paginator;
    //         });

  }
  openDialog(element: any): void {
    let dialogRef = this.dialog.open(WinDetailsParentComponent, {
     // width: '650px',
      maxWidth: '100vw',
     // height: '500px',
      maxHeight: '100vw',
      panelClass: 'my-dialog',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onBtnReportClick() {

    this.submitted = true;
    this.loading = true;
    this.service.findAllWinDetailsFilter({
      from_date: this.from_date,
      to_date: this.to_date,
      draw: this.draw,
      billno: this.billno,
      limit: 20000,
      offset: 1
    }).subscribe((res: any)=>{
     this.dataSource = res
     this.loading =false;
     this.dataSource = new MatTableDataSource(res);
     this.dataSource.paginator = this.paginator;
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
    XLSX.utils.book_append_sheet(workbook, reportSheet, 'lottery-win-details');
    let filename = 'lottery-win-details';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    Object.keys(workbook).forEach(key => {
      if (key == "8") {
        delete reportSheet[key];
      }
    });
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



export interface datawindetails{
  Billno:string;
  OrderDate:string;
  Draw:number;
  DrawDate:string;
  PaymentType:string;
  PaymentAmount:number;
  WinAmount:number;
  Customers:string;
  Phone:string;

    }
