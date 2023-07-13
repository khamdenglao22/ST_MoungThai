import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { RewardService } from '../reward.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reward-payout-summary',
  templateUrl: './reward-payout-summary.component.html',
  styleUrls: ['./reward-payout-summary.component.scss'],
})
export class RewardPayoutSummaryComponent implements OnInit {
  formTopUp: FormGroup = new FormGroup({
    networkStatus: new FormControl([]),
    from_date: new FormControl(null, Validators.required),
    to_date: new FormControl(null, Validators.required),
  });

  submitted = false;
  value = 'Clear me';
  sum = 0;
  shopRewardPayoutSummary: Array<any> = [];

  constructor(private rewardService: RewardService) {}

  ngOnInit(): void {}

  onBtnReportClick() {
    if (this.formTopUp.invalid) {
      return;
    }
    this.submitted = true;
    this.sum = 0;
    this.rewardService
      .rewardPayoutSummary(this.formTopUp.value)
      .subscribe((response: any) => {
        this.shopRewardPayoutSummary = response.rewardvpayoutsummaries;
        const amount = response.rewardvpayoutsummaries.map(
          (response: any) => response.rewardPayout
        );
        this.sum = amount.reduce(
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

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'ຍອດເງິນແນະນຳທີ່ຈ່າຍແລ້ວ');

    let filename = 'ຍອດເງິນແນະນຳທີ່ຈ່າຍແລ້ວ';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
}
