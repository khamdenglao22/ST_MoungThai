import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
})
export class BannerListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  users: Array<any> = [];
  displayedColumns = ['image', 'banner_position', 'active', 'edit', 'delete'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private service: BannerService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllBanner().subscribe((res: any) => {
      this.dataSource = res.data;
      console.log(res.data);
    });
  }

  deleteBanner(banner_id: number | null) {
    this.service.deleteBanner(banner_id).subscribe((res: any) => {
      alert(res.msg);
      this.loadData();
    });
  }

  updateBannerAdvertising(_data: any) {
    const data = {
      active: !_data.active,
    };

    this.service
      .updateBannerActive(data, _data.id)
      .subscribe((response: any) => {
        this.loadData();
      });
  }
}
