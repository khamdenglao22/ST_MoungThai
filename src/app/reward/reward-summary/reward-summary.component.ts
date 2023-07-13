import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { RewardService } from '../reward.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reward-summary',
  templateUrl: './reward-summary.component.html',
  styleUrls: ['./reward-summary.component.scss'],
})
export class RewardSummaryComponent implements OnInit {
  formTopUp: FormGroup = new FormGroup({
    product: new FormControl(''),
    from_date: new FormControl(null, Validators.required),
    to_date: new FormControl(null, Validators.required),
  });
  networkComplete = false;
  // networks = [
  //   { name: 'Sokxay Mart', id: 1 },
  //   { name: 'SOKXAY LOTTERY', id: 2 },
  //   { name: 'Unitel', id: 3 },
  //   { name: 'LTC', id: 4 },
  //   { name: 'TPlus', id: 5 },
  //   { name: 'ETL', id: 6 },
  // ];
  submitted = false;
  networkArr: Array<any> = [];
  shopRewardSummary: Array<any> = [];
  shop = '';
  sumMart = 0;
  sumLot = 0;
  sumUnitel = 0;
  sumLTC = 0;
  sumTplus = 0;
  sumETL = 0;
  appName = 'SXALL';
  offset = 0;
  limit = 10000;
  rewardProductType: Array<any> = [];
  idOfFilterOrderStatus: Array<any> = [];
  filterOrderStatus: Array<any> = [];
  productR: any;

  constructor(private rewardService: RewardService) {}

  setAllNetwork(isChecked: boolean) {
    if (isChecked) {
      this.formTopUp.get('product')?.setValue(this.rewardProductType);
      this.networkArr = this.rewardProductType.map((item) => {
        return item.rewardTypeDesc;
      });
      this.rewardProductType;
    } else {
      this.networkArr = [];
      this.formTopUp.get('product')?.setValue([]);
    }
  }

  setAnyNetwork(isChecked: boolean) {
    // if (isChecked) {
    //   this.formTopUp.get('product')?.setValue(this.rewardProductType);
    //   this.networkArr = this.rewardProductType.map((item) => {
    //     return item.rewardTypeDesc;
    //   });
    //   this.rewardProductType;
    // } else {
    //   this.networkArr = [];
    //   this.formTopUp.get('product')?.setValue([]);
    // }
  }

  shouldShowColumn(productName: string) {
    for (const product of this.productR) {
      if (product.Product === productName) {
        return true;
      }
    }
    return false;
  }

  onBtnReportClick() {
    this.submitted = true;

    if (this.formTopUp.invalid) {
      this.submitted = false;
      return;
    }

    this.sumMart = 0;
    this.sumLot = 0;
    this.sumUnitel = 0;
    this.sumLTC = 0;
    this.sumTplus = 0;
    this.sumETL = 0;
    this.productR = [];

    let Product = null;

    if (
      this.formTopUp.value.product == null ||
      this.formTopUp.value.product.length == 0
    ) {
      this.productR = this.rewardProductType.map((value: any) => ({
        Product: value.rewardTypeDesc,
      }));
    } else {
      this.productR = this.formTopUp.value.product.map((value: any) => ({
        Product: value.rewardTypeDesc,
      }));
    }

    this.rewardService
      .rewardSummary({
        Offset: this.offset,
        Limit: this.limit,
        AppName: this.appName,
        StartDate: this.formTopUp.value.from_date,
        EndDate: this.formTopUp.value.to_date,
        Products: Product,
      })
      .subscribe((response: any) => {
        this.shopRewardSummary = response.rewardvsummaries;

        for (let i = 0; i < this.shopRewardSummary.length; i++) {}

        const amountMart = response.rewardvsummaries.map(
          (response: any) => response.martRewardGenerated || 0
        );
        this.sumMart = amountMart.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );

        const amountLot = response.rewardvsummaries.map(
          (response: any) => response.lottoRewardGenerated || 0
        );

        this.sumLot = amountLot.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );

        const amountUnitel = response.rewardvsummaries.map(
          (response: any) => response.unitelRewardGenerated || 0
        );

        this.sumUnitel = amountUnitel.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );

        const amountLTC = response.rewardvsummaries.map(
          (response: any) => response.ltcRewardGenerated || 0
        );

        this.sumLTC = amountLTC.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );

        const amountTplus = response.rewardvsummaries.map(
          (response: any) => response.tplusRewardGenerated || 0
        );

        this.sumTplus = amountTplus.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );

        const amountETL = response.rewardvsummaries.map(
          (response: any) => response.etlRewardGenerated || 0
        );

        this.sumETL = amountETL.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );
      });
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

          // #printable {
          //   /*Print style goes here*/
          //   margin: 10rem;
          // }

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

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'ສັງລວມຍອດເງິນແນະນຳ');

    let filename = 'ສັງລວມຍອດເງິນແນະນຳ ';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  ngOnInit(): void {
    this.loadProductType();
  }

  loadProductType() {
    this.rewardService.rewardProductType(this.appName).subscribe((res: any) => {
      this.rewardProductType = res;
    });
  }
}
