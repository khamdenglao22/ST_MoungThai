import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/auth/auth.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { RewardService } from '../reward.service';

@Component({
  selector: 'app-reward-payout-detail',
  templateUrl: './reward-payout-detail.component.html',
  styleUrls: ['./reward-payout-detail.component.scss'],
})
export class RewardPayoutDetailComponent implements OnInit {
  displayedColumns: string[] = [
    'cus_id',
    'cus_phone',
    'cus_name',
    'cus_account',
    'pay_success',
    'pay_date',
    'reference',
  ];

  limit = 50;
  loading = false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  fromDate: any;
  toDate: any;
  submitted = true;
  excelData: any;
  user: any;
  failedTask: any[] = [];
  rewardPayoutDetails: any[] = [];
  totalSize = 0;

  form = new FormGroup({
    from_date: new FormControl("", Validators.required),
    to_date: new FormControl("", Validators.required),
    phone: new FormControl(""),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private pointRewardService: RewardService,
    private authService: AuthService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.paginator!!.pageIndex = 0;

    merge(this.paginator!!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.pointRewardService.findAllPayoutDetail({
              offset: this.paginator!!.pageIndex,
              limit: this.limit,
              phone: this.form.value.phone,
              startDate: this.form.value.from_date,
              endDate: this.form.value.to_date
            }).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          if (data === null) {
            return [];
          }
          return data;
        }),
      )
      .subscribe(data => {
        this.totalSize = data.totalSize;
        this.rewardPayoutDetails = data.rewardPayoutDetails;
      });
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  exportToExcel() {
    let report = document.getElementById('report');
    const reportSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(report);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, reportSheet, 'ລາຍລະອຽດການຈ່າຍເງິນແນະນຳ');

    let filename = 'ລາຍລະອຽດການຈ່າຍເງິນແນະນຳ';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  downloadFailedTask() {
    this.failedTask = this.failedTask.map((item: any) => {
      delete item.CreatedBy;
      return item;
    });

    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.failedTask);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, sheet, 'ລາຍການຈ່າຍເງິນແນະນຳທີ່ບໍ່ສຳເລັດ');

    let filename = 'ລາຍການຈ່າຍເງິນແນະນຳທີ່ບໍ່ສຳເລັດ';
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  onFileChange(event: any) {
    let file = event.target.files[0];

    if (file) {
      if (confirm("ທ່ານໝັ້ນໃຈບໍ່ວ່າຕ້ອງການນຳເຂົ້າຂໍ້ມູນ?")) {
        this.loading = true;
        let totalTask = 0;
        let successTask = 0;
        let completedTask = [];
        this.failedTask = [];

        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.onload = (e) => {
          let workBook = XLSX.read(fileReader.result, { type: 'binary' });
          let sheetName = workBook.SheetNames;
          this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]], { raw: false });
          totalTask = this.excelData.length;

          for (let row of this.excelData) {
            const payoutDetail = {
              ...row,
              CreatedBy: this.user.user_id
            };

            this.pointRewardService.createPayoutDetail(payoutDetail).subscribe(() => {
              successTask += 1;
              console.log(`ບັນທຶກຂໍ້ມູນແຖວທີ ${successTask}`);
              completedTask.push(payoutDetail);
              if (successTask == totalTask) {
                this.loading = false;
                alert(`ສຳເລັດ ${completedTask.length} ລາຍການ, ບໍ່ສຳເລັດ ${this.failedTask.length} ລາຍການ`);
              }
            }, (err: any) => {
              successTask += 1;
              console.log(err);
              this.failedTask.push(payoutDetail);
              if (successTask == totalTask) {
                this.loading = false;
                alert(`ສຳເລັດ ${completedTask.length} ລາຍການ, ບໍ່ສຳເລັດ ${this.failedTask.length} ລາຍການ`);
              }
            });
          }
          console.log(this.excelData);
        };
      }
    }
  }

  printIsSuedPoint() {
    var divToPrint = document.getElementById('report');
    var htmlToPrint = `
    <style type="text/css">
    table, td, th  {
      border: 1px solid #000;
      border-collapse: collapse;
    }
    table{
      width: 100%;

    }
    td, th  {
      padding: 5px;
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
    if (this.form.invalid) {
      return;
    }
    this.loadData();
  }
}
