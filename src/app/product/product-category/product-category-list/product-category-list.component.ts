import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategoryService } from '../product-category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  displayedColumns = ['product_cate_la', 'product_cate_en', 'edit'];
  loading = false;


  dataProductCate: Array<any> = [];


  constructor(private service : ProductCategoryService) { }

  ngOnInit(): void {
    this.service.findAllCategory().subscribe((res:any) => {
      this.dataProductCate = res.data;
    })
  }

}
