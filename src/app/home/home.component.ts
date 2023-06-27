import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['number', 'order_id', 'order_date', 'store'];

  limit = 5;
  resultsLength = 0;
  loading = true;
  total_amount_today = 0;
  total_amount_month = 0;
  total_order_today = 0;
  total_order_month = 0;
  total_customer = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {}

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  ngAfterViewInit() {
    this.loadData();

    setInterval(() => {
      this.loadData();
    }, 1 * 60 * 1000);
  }

  loadData() {
    this.paginator!!.pageIndex = 0;

    merge(this.paginator!!.page).pipe(
      startWith({}),
      switchMap(() => {
        this.loading = true;
        return this.service
          .findAllDashboardData(this.limit, this.paginator!!.pageIndex + 1)
          .pipe(catchError(() => observableOf(null)));
      }),
      map((data) => {
        this.loading = false;

        if (data === null) {
          return [];
        }

        return data;
      })
    );
  }
}
