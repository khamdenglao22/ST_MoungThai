import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProvinceService } from '../province.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  displayedColumns = ['product_cate_la', 'product_cate_en', 'edit'];
  loading = false;


  dataProvince: any;
  resultsLength: number;
  limit: number;


  constructor(private service : ProvinceService) { }

  ngOnInit(): void {
    this.service.findAllProvince().subscribe((res:any) => {
      // this.dataProvince = res.data;
      this.dataProvince = new MatTableDataSource(res.data);
      this.dataProvince.paginator = this.paginator;
    })
  }

}
