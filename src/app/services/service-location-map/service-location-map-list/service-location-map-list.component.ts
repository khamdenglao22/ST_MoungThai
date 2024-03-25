import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceLocationMapService } from '../service-location-map.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-location-map-list',
  templateUrl: './service-location-map-list.component.html',
  styleUrls: ['./service-location-map-list.component.scss'],
})
export class ServiceLocationMapListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataMap: Array<any> = [];
  displayedColumns = ['image', 'province', 'country', 'edit', 'delete'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: ServiceLocationMapService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.findAllMap().subscribe((res: any) => {
      this.dataMap = res.data;
      // console.log(res.data)
      this.dataSource = new MatTableDataSource(this.dataMap);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  deleteServiceLocationMap(id: number | null) {
    this.loading = true;
    this.service.deleteMapById(id).subscribe((res: any) => {
      alert(res.msg);
      this.loadData();
      this.loading = false;
    });
  }
}
