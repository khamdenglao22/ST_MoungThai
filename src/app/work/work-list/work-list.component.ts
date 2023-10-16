import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
})
export class WorkListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  works: Array<any> = [];
  displayedColumns = ['depart_name_la', 'depart_name_en','position_name_la','position_name_en','province','amount', 'edit'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: WorkService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllWork().subscribe((res: any) => {
      this.works = res.data;
      console.log(res.data)
      this.dataSource = new MatTableDataSource(this.works);
      this.dataSource.paginator = this.paginator;
    });
  }
}
