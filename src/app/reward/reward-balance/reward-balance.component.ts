import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { RewardService } from '../reward.service';
import { merge, of as observableOf } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reward-balance',
  templateUrl: './reward-balance.component.html',
  styleUrls: ['./reward-balance.component.scss'],
})
export class RewardBalanceComponent implements OnInit {
  firstname: any = '';
  phone: any = '';
  displayedColumns: string[] = [
    'cus_id',
    'cus_phone',
    'cus_name',
    'cus_account',
    'rewardTotal',
    'rewardPaid',
    'rewardBalance',
  ];
  limit = 50;
  resultsLength = 0;

  shopRewardBalance: Array<any> = [];
  rewardBalanceAll: Array<any> = [];
  sumRewardBalance: Array<any> = [];
  productRewardBalance: Array<any> = [];
  totalAmt = 0;
  paidAmt = 0;
  balanceAmt = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rewardService: RewardService) {}

  ngAfterViewInit(): void {
    this.paginator!!.pageIndex = 0;

    merge(this.paginator!!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.rewardService
            .rewardBalance({
              offset: this.paginator!!.pageIndex,
              limit: this.limit,
            })
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          if (data === null) {
            return [];
          }
          return data;
        })
      )
      .subscribe((data) => {
        this.totalAmt = data.totalAmt;
        this.paidAmt = data.paidAmt;
        this.balanceAmt = data.balanceAmt;
        this.shopRewardBalance = data.backofficeRewardBalances;
        this.productRewardBalance = data.productsAmt;
        this.resultsLength = data.totalSize;
      });

    this.rewardService
      .rewardBalance({
        offset: 0,
        limit: 20000000,
      })
      .subscribe((response: any) => {
        const balances = response.backofficeRewardBalances;
        this.rewardBalanceAll = balances.map((item: any) => {
          return {
            RewardId: item.custId,
            RewardPhone: item.custPhone,
            RewardFullName: item.custFullName,
            RewardACC: item.custBankAcc,
            RewardPaid: item.rewardBalance,
            PaidDate: '',
            PaidRefId: '',
          };
        });
      });
  }
  onBtnReportClick() {
    this.paginator!!.pageIndex = 0;

    merge(this.paginator!!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.rewardService
            .rewardBalanceFilter({
              offset: this.paginator!!.pageIndex,
              limit: this.limit,
              firstname: this.firstname,
              phone: this.phone,
            })
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          if (data === null) {
            return [];
          }
          return data;
        })
      )
      .subscribe((data) => {
        this.totalAmt = data.totalAmt;
        this.paidAmt = data.paidAmt;
        this.balanceAmt = data.balanceAmt;
        this.shopRewardBalance = data.backofficeRewardBalances;
        this.productRewardBalance = data.productsAmt;
        this.resultsLength = data.totalSize;
      });

    this.rewardService
      .rewardBalanceFilter({
        offset: 0,
        limit: 20000000,
        firstname: this.firstname,
        phone: this.phone,
      })
      .subscribe((response: any) => {
        const balances = response.backofficeRewardBalances;
        this.rewardBalanceAll = balances.map((item: any) => {
          return {
            RewardId: item.custId,
            RewardPhone: item.custPhone,
            RewardFullName: item.custFullName,
            RewardACC: item.custBankAcc,
            RewardPaid: item.rewardBalance,
            PaidDate: '',
            PaidRefId: '',
          };
        });
      });
  }

  ngOnInit(): void {}

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  printDiv() {
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

  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      reportSheet,
      'ສັງລວມຍອດເງິນແນະນຳຕາມຜະລິດຕະພັນ'
    );

    let filename = 'ສັງລວມຍອດເງິນແນະນຳຕາມຜະລິດຕະພັນ';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  exportRewardBalanceToExcel() {
    const reportSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.rewardBalanceAll
    );
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      reportSheet,
      'ເງິນແນະນຳທີ່ລູກຄ້າໄດ້ຮັບ'
    );

    let filename = 'ເງິນແນະນຳທີ່ລູກຄ້າໄດ້ຮັບ';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }
}
