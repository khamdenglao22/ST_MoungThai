import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { PointRewardService } from '../point-reward.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-point-issued-used',
  templateUrl: './point-issued-used.component.html',
  styleUrls: ['./point-issued-used.component.scss'],
})
export class PointIssuedUsedComponent implements OnInit {
  displayedColumns: string[] = ['number', 'order_id'];

  limit = 1000;
  offset = 0;
  AppName = 'SXALL';

  resultsLength = 0;
  loading = false;

  isSelectAllOrderStatus = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  // orderStatuses = [];
  idProducts: Array<any> = [];
  submitted = false;
  dataProductType: Array<any> = [];
  dataPointIssued: Array<any> = [];

  totalPointGenerated = 0;
  totalPointUsaged = 0;
  totalReturn = 0;
  totalGetBack = 0;

  form = new FormGroup({
    month: new FormControl(null, Validators.required),
    product: new FormControl(null, Validators.required),
  });

  setAll(isChecked: boolean) {
    if (isChecked) {
      this.form.get('product')?.setValue(this.dataProductType);
      this.idProducts = this.dataProductType.map((item) => {
        return item.id;
      });
      this.dataProductType;
    } else {
      this.idProducts = [];
      this.form.get('product')?.setValue([]);
    }

    // this.loadData();
  }

  onBtnOrderStatusClick(item: any) {
    const index = this.idProducts.indexOf(item.id);
    console.log(index);
    if (index == -1) {
      this.idProducts.push(item.id);
    } else {
      this.idProducts.splice(index, 1);
    }
    // this.loadData();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: PointRewardService) {}

  ngOnInit(): void {
    // this.loadData();
    this.loadProductType();
  }
  // home

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
  // summery

  loadProductType() {
    // console.log(this.AppName)
    this.service.findPointProductType(this.AppName).subscribe((res: any) => {
      // console.log(res)
      this.dataProductType = res;
    });
  }

  // loadData() {
  //   this.loading = false;

  //   let monthFormat = this.form.value.month;
  //   let month = moment(monthFormat).format('MM-YYYY');
  //   console.log(month); // 08-2022

  //   this.service
  //     .findIssuedUsed({
  //       Offset: this.offset,
  //       Limit: this.limit,
  //       AppName: this.AppName,
  //       Month: month,
  //       Products: this.form.value.product,
  //     })
  //     .subscribe((res: any) => {
  //       console.log(res);
  //     });
  // }

  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'ການໃຫ້ ແລະ ນຳໃຊ້ຄະແນນ ');

    let filename = 'ການໃຫ້ ແລະ ນຳໃຊ້ຄະແນນ ';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  printIsSuedPoint() {
    var divToPrint = document.getElementById('report');
    var htmlToPrint = `
    <link
    rel="stylesheet"
    href="${environment.phetsarathUrl}"
  />

        <style type="text/css">

        @media print {
          @page {
            margin: 1rem;
          }
        }

        *{
          font-family: phetsarathregular
        }

          table, td, th  {
            border: 1px solid #000;
            border-collapse: collapse;

          }
          table{
            width: 100%;
          }
          td, th  {
            padding: 5px;

          }

          .date_sale_summary{
            text-align: center;
          }

        </style>`;
    htmlToPrint += divToPrint?.outerHTML;
    let newWin = window.open('');
    newWin?.document.write(htmlToPrint);
    setTimeout(() => {
      newWin?.print();
      newWin?.close();
    }, 1000);
  }

  onBtnReportClick() {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      this.submitted = false;
      this.loading = false;
      return;
    }

    let monthFormat = this.form.value.month;
    let month = moment(monthFormat).format('MM-YYYY');
    // console.log(month); // 08-2022

    let dataProduct = this.form.value.product.map( (item:any) => ({
      Product:item.pointTypeDesc
    }))

    // console.log("data = " + dataProduct)

    this.service
      .findIssuedUsed({
        Offset: this.offset,
        Limit: this.limit,
        AppName: this.AppName,
        Month: month,
        Products: dataProduct,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
          this.loading = false;
          this.dataPointIssued = res.rewardIssuedUsages;
          this.totalPointGenerated = res.totalPointGenerated;
          this.totalPointUsaged = res.totalPointUsaged;
          this.totalReturn = res.totalReturn;
          this.totalGetBack = res.totalGetBack;
        },
        (err) => {
          // console.log(err);
        }
      );
  }
}
