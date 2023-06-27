import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as XLSX from 'xlsx';
import { PointRewardService } from '../point-reward.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-point-balance',
  templateUrl: './point-balance.component.html',
  styleUrls: ['./point-balance.component.scss'],
})
export class PointBalanceComponent implements OnInit {
  limit = 1000;
  Offset = 0;
  AppName = 'SXALL';

  resultsLength = 0;
  loading = false;
  company: any = '';
  isSelectAllProduct = false;
  monthFormat: any;
  pointBalance: any;

  total_pointGenerated = 0;
  total_pointUsaged = 0;
  total_amount = 0;
  formProduct: any;
  products: Array<any> = [];

  // summery
  form = new FormGroup({
    month: new FormControl(null, Validators.required),
    products: new FormControl(null, Validators.required),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: PointRewardService) {}

  ngOnInit(): void {
    this.loadProducts();
    console.log('form', this.form.value);
  }

  setAll(isChecked: boolean) {
    console.log('products', this.products);

    if (isChecked) {
      this.form.get('products')?.setValue(this.products);
    } else {
      this.form.get('products')?.setValue([]);
    }
    // this.loadData();
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  loadData() {
    this.loading = false;

    console.log('value', this.form.value.products);

    this.formProduct = this.form.value.products.map((item: any) => ({
      Product: item.pointTypeDesc,
    }));
    this.monthFormat = this.form.value.month;

    console.log(this.formProduct);
    console.log(this.monthFormat);

    // console.log(this.Offset)
    // console.log(this.limit)
    // console.log(this.AppName)
    // console.log(this.monthFormat);

    this.service
      .findPointBalance({
        Offset: this.Offset,
        Limit: this.limit,
        AppName: this.AppName,
        Month: this.monthFormat,
        Products: this.formProduct,
      })
      .subscribe((res: any) => {
        // console.log(res);
        this.pointBalance = res.pointvbalances;
        this.total_pointGenerated = res.totalPointGenerated;
        this.total_pointUsaged = res.totalPointUsaged;
        this.total_amount = res.totalPointBalance;
      });
  }

  loadProducts() {
    this.service
      .findPointProduct({ AppName: this.AppName })
      .subscribe((res: any) => {
        // console.log(res)
        this.products = res;
        console.log('112 prod', this.products);
        const lottoProd = this.products.filter((product) => {
          return product.pointTypeDesc == 'LOTTERY';
        });

        console.log('lottoProd', lottoProd);

        this.form.get('products')?.setValue(lottoProd);

        this.loadData();
      });
  }

  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'ຍອດຄະແນນຍັງເຫຼືອ');

    let filename = 'ຍອດຄະແນນຍັງເຫຼືອ';
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
    if (this.form.invalid) {
      return;
    }

    this.monthFormat = this.form.value.month;
    let month = moment(this.monthFormat).format('MM-YYYY');
    console.log(month); // 08-2022

    // console.log('data' + this.form.value.products);
    // get data array
    let dataProduct;
    if (this.form.value.products === null) {
      //  console.log(dataProduct = null);
      dataProduct = null;
    } else {
      dataProduct = this.form.value.products.map((item: any) => ({
        Product: item.pointTypeDesc,
      }));
    }

    console.log(dataProduct);

    this.service
      .findPointBalance({
        Offset: this.Offset,
        Limit: this.limit,
        AppName: this.AppName,
        Month: month,
        Products: dataProduct,
      })
      .subscribe(
        (res: any) => {
          this.pointBalance = res.pointvbalances;
          this.total_pointGenerated = res.totalPointGenerated;
          this.total_pointUsaged = res.totalPointUsaged;
          this.total_amount = res.totalPointBalance;
        },
        (err: any) => {
          this.pointBalance = [];
          this.total_pointGenerated = 0;
          this.total_pointUsaged = 0;
          this.total_amount = 0;
        }
      );
  }
}
