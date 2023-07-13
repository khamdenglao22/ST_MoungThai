import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { RewardService } from '../reward.service';

@Component({
  selector: 'app-reward-transaction-history',
  templateUrl: './reward-transaction.component.html',
  styleUrls: ['./reward-transaction.component.scss'],
})
export class RewardTransactionComponent implements OnInit {
  displayedColumns: string[] = ['number', 'order_id'];

  limit = 100000;
  offset = 0;
  appName = 'SXALL';

  resultsLength = 0;
  loading = false;

  isSelectAllOrderStatus = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  // orderStatuses = [];
  idProducts: Array<any> = [];
  fromDate: any;
  toDate: any;
  toPoint: [] = [];
  submitted = false;
  rewardProduct: Array<any> = [];
  rewardTransaction: Array<any> = [];
  total_amount = 0;

  setAll(isChecked: boolean) {
    if (isChecked) {
      this.form.get('product')?.setValue(this.rewardProduct);
      this.idProducts = this.rewardProduct.map((item) => {
        console.log(item);
        return item.id;
      });
      this.rewardProduct;
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

  constructor(private service: RewardService) {}

  ngOnInit(): void {
    // this.loadData()
    this.loadRewardProduct()
  }

  // home

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
  // summery

  form = new FormGroup({
    from_date: new FormControl(null, Validators.required),
    to_date: new FormControl(null, Validators.required),
    product: new FormControl(null,),
    cus_hone: new FormControl('',),
  });

  loadRewardProduct(){
    this.service.rewardProductType({AppName:this.appName}).subscribe((res:any) => {
      this.rewardProduct = res
      // console.log(res)
    })
  }


  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'ການໃຫ້ເງິນແນະນຳແກ່ລູກຄ້າ ');

    let filename = 'ການໃຫ້ເງິນແນະນຳແກ່ລູກຄ້າ ';
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
    newWin?.print();
    newWin?.close();
  }

  onBtnReportClick() {
    this.submitted = true;
    // this.loading = true;
    if (this.form.invalid) {
      this.submitted = false;
      // this.loading = false;
      return;
    }

    // console.log(this.form.value.product)

    let dataProduct = null
    if(this.form.value.product != null && this.form.value.product.length > 0){
      dataProduct = this.form.value.product.map( (item:any) => ({
        Product:item.rewardTypeDesc
      }))
    }

    console.log(dataProduct)

    this.service
      .findRewardHistory({
        Offset: this.offset,
        Limit: this.limit,
        AppName: this.appName,
        StartDate: this.form.value.from_date,
        EndDate: this.form.value.to_date,
        CustPhone: this.form.value.cus_hone,
        Products: dataProduct
      })
      .subscribe((res: any) => {
        // console.log(res);
        this.rewardTransaction = res.backofficeRewardTransac;
        this.total_amount = res.totalAmt
      });
  }
}
