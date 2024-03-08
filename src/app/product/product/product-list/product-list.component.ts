import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  displayedColumns = [
    'image',
    'p_name_la',
    'p_name_en',
    'p_cate_sub_la',
    'p_cate_sub_en',
    'edit',
    'delete',
  ];
  loading = false;

  dataProduct: Array<any> = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllProduct().subscribe((res: any) => {
      this.dataProduct = res.data;
      // console.log(res.data)
    });
  }

  deleteProduct(id: number | null) {
    this.service.deleteProduct(id).subscribe((res: any) => {
      alert(res.msg);
      this.loadData();
    });
  }
}
