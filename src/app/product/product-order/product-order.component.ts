import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductOrderService } from './product-order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  displayedColumns = ['full_name','email','phone', 'product_la','product_en'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  dataProductOrder: Array<any> = [];


  constructor(private service : ProductOrderService) { }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
    this.loadData();

    setInterval(() => {
      this.loadData();
    }, (1 * 60) * 5000);
  }

  loadData(){
    this.service.findAllProductOrder().subscribe((res:any) => {
      this.dataProductOrder = res.data;
      this.dataSource = new MatTableDataSource(this.dataProductOrder);
      this.dataSource.paginator = this.paginator;
      // console.log(res.data)
    })
  }

}
