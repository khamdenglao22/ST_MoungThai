import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ServiceTypeService } from '../service-type.service';

@Component({
  selector: 'app-service-type-list',
  templateUrl: './service-type-list.component.html',
  styleUrls: ['./service-type-list.component.scss']
})
export class ServiceTypeListComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataType: Array<any> = [];
  displayedColumns = ['service_type_la', 'service_type_en', 'edit'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private service: ServiceTypeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllServiceType().subscribe((res: any) => {
      this.dataType = res.data;
      this.dataSource = new MatTableDataSource(this.dataType);
      this.dataSource.paginator = this.paginator;
    });
  }

}
