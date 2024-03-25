import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ServiceLocationService } from '../service-location.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-location-list',
  templateUrl: './service-location-list.component.html',
  styleUrls: ['./service-location-list.component.scss'],
})
export class ServiceLocationListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataLocation: Array<any> = [];
  displayedColumns = [
    'location_name_la',
    'location_name_en',
    'country_name_la',
    'section',
    'prov_name_la',
    'dist_name_la',
    'vill_name_la',
    'edit',
    'delete',
  ];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: ServiceLocationService) {}

  form: FormGroup = new FormGroup({
    location_name: new FormControl(''),
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.findAllLocation().subscribe((res: any) => {
      this.dataLocation = res.data;
      this.dataSource = new MatTableDataSource(this.dataLocation);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  deleteServiceLocation(id: number | null) {
    this.service.deleteLocationById(id).subscribe((res: any) => {
      alert(res.msg);
      this.loadData();
    });
  }

  searchSubmit(){
    this.loading = true;
    this.service.searchLocation(this.form.value).subscribe((res:any) => {
      this.dataLocation = res.data;
      this.dataSource = new MatTableDataSource(this.dataLocation);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }
}
