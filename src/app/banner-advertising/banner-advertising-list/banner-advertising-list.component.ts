import { Component, OnInit } from '@angular/core';
import { BannerAdvertisingService } from '../banner-advertising.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner-advertising-list',
  templateUrl: './banner-advertising-list.component.html',
  styleUrls: ['./banner-advertising-list.component.scss'],
})
export class BannerAdvertisingListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  users: Array<any> = [];
  displayedColumns = ['image', 'banner_position', 'active', 'edit', 'delete'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private service: BannerAdvertisingService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllBannerAdvertising().subscribe((res: any) => {
      this.dataSource = res.data;
    });
  }

  updateBannerAdvertising(advertising: any) {
    const data = {
      active: !advertising.active,
    };

    this.service
      .updateBannerAdvertisingActive(data, advertising.id)
      .subscribe((response: any) => {
        this.loadData();
      });
  }

  deleteBanner(id: number | null) {
    this.service.deleteBannerAdvertisingActive(id).subscribe((res: any) => {
      alert(res.msg);
      this.loadData();
    });
  }
}
