import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ServiceCountryService } from '../service-country.service';

@Component({
  selector: 'app-service-country-list',
  templateUrl: './service-country-list.component.html',
  styleUrls: ['./service-country-list.component.scss']
})
export class ServiceCountryListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataCountry: Array<any> = [];
  displayedColumns = ['country_name_la', 'country_name_en', 'service_type_la','edit'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private service: ServiceCountryService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.findAllServiceCountry().subscribe((res:any) => {
      this.dataCountry = res.data;
      this.dataSource = new MatTableDataSource(this.dataCountry);
      this.dataSource.paginator = this.paginator;
    })
  }

}
