import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ServiceLocationService } from '../service-location.service';

@Component({
  selector: 'app-service-location-list',
  templateUrl: './service-location-list.component.html',
  styleUrls: ['./service-location-list.component.scss']
})
export class ServiceLocationListComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataLocation: Array<any> = [];
  displayedColumns = ['location_name_la', 'location_name_en', 'country_name_la', 'section', 'prov_name_la','dist_name_la', 'vill_name_la', 'edit'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private service: ServiceLocationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.findAllLocation().subscribe((res:any) => {
      this.dataLocation = res.data;
      this.dataSource = new MatTableDataSource(this.dataLocation);
      this.dataSource.paginator = this.paginator;
    })
  }

}
