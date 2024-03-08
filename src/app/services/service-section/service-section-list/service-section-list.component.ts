import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ServiceSectionService } from '../service-section.service';

@Component({
  selector: 'app-service-section-list',
  templateUrl: './service-section-list.component.html',
  styleUrls: ['./service-section-list.component.scss']
})
export class ServiceSectionListComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataType: Array<any> = [];
  displayedColumns = ['section_name_la', 'section_name_en','position', 'edit'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private service: ServiceSectionService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllSection().subscribe((res: any) => {
      this.dataType = res.data;
      this.dataSource = new MatTableDataSource(this.dataType);
      this.dataSource.paginator = this.paginator;
    });
  }
}
