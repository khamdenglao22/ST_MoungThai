import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PushNotificationSettingService } from '../push-notification-setting.service';

@Component({
  selector: 'app-push-notification-setting-list',
  templateUrl: './push-notification-setting-list.component.html',
  styleUrls: ['./push-notification-setting-list.component.scss']
})
export class PushNotificationSettingListComponent implements OnInit {

  data: Array<any> = []
  displayedColumns = ["no", "order_status", "title", "body", "image", "send_to_store", "send_to_delivery", "send_to_customer", "edit"];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private service: PushNotificationSettingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  private loadData() {
    this.loading = true
    this.service.findAllPushNotificationSetting().subscribe((response:any) => {
      this.data = response
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    }, () => this.loading = false)
  }

}
