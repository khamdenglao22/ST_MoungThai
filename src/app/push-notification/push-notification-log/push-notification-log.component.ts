import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { PushLog, PushNotificationService } from '../push-notification.service';

@Component({
  selector: 'app-push-notification-log',
  templateUrl: './push-notification-log.component.html',
  styleUrls: ['./push-notification-log.component.scss']
})
export class PushNotificationLogComponent implements OnInit {
  displayedColumns = ["title", "body", "push_by", "push_date"];
  loading = true;
  limit = 50
  data: PushLog[] = [];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private service: PushNotificationService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadData()
  }

  private loadData() {
    this.paginator!!.pageIndex = 0;

    merge(this.paginator!!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.service.getPushLog(
              this.paginator!!.pageIndex + 1,
              this.limit
            ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.loading = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalData;
          return data.results;
        }),
      )
      .subscribe(data => (this.data = data));
  }

}
