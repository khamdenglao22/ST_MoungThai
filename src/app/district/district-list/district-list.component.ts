import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DistrictService } from '../district.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  displayedColumns = ['product_cate_la', 'product_cate_en', 'province', 'edit'];
  loading = false;


  dataDistrict: any;
  resultsLength: number;
  limit: number;


  constructor(private service : DistrictService) { }

  ngOnInit(): void {
    this.service.findAllDistrict().subscribe((res:any) => {
      // this.dataDistrict = res.data;
      this.dataDistrict = new MatTableDataSource(res.data);
      this.dataDistrict.paginator = this.paginator;
    })
  }

}
