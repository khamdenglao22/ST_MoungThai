import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuditLog, AuditService } from '../audit.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.scss']
})
export class AuditListComponent implements OnInit {

  displayedColumns: string[] = ['number', 'user', 'action_detail', 'action_date', 'tag', 'action_from'];
  data: AuditLog[] = [];
  loading = true;
  limit = 50
  resultsLength = 0;
  TagList: Array<any> = ["All", "Order", "Coupon", "Product", "Variation", "Wholesale", "User", "Delivery-Person", "Setting", "Promotion"];
  selectedTags: Array<any> = [];
  tagCollection: Array<any> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: AuditService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadData()
  }

  onBtnTagClick(tag: any) {
    const index = this.tagCollection.indexOf(tag);
    if (index == -1) {
      this.selectedTags.push(tag);
      this.tagCollection.push(tag);
      this.loadData();
    }
  }

  removeItemInSelectedTags(index: number) {
    this.tagCollection.splice(index, 1);
    this.selectedTags.splice(index, 1);
    this.loadData();
  }

  loadData() {
    this.paginator!!.pageIndex = 0;

    merge(this.paginator!!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service.findAll(
            this.paginator!!.pageIndex + 1,
            this.limit,
            this.selectedTags
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
          this.resultsLength = data.totalResult;
          return data.results;
        }),
      )
      .subscribe(data => (this.data = data));
  }

}
