import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VillageService } from '../village.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-village-list',
  templateUrl: './village-list.component.html',
  styleUrls: ['./village-list.component.scss']
})
export class VillageListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  displayedColumns = ['product_cate_la', 'product_cate_en', 'edit'];
  loading = false;


  dataVillage: any;
  resultsLength: number;
  limit: number;

  constructor(private service : VillageService) { }

  ngOnInit(): void {
    this.loading = true;
    this.service.findAllVillage().subscribe((res:any) => {
      // this.dataVillage = res.data;
      this.dataVillage = new MatTableDataSource(res.data);
      this.dataVillage.paginator = this.paginator;
      // console.log(res.data)
      this.loading = false;
    })
  }

}
