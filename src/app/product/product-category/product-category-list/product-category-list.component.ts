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
  displayedColumns = ['product_cate_la', 'product_cate_en', 'edit','delete'];
  loading = false;


  dataProductCate: Array<any> = [];


  constructor(private service : ProductCategoryService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.findAllCategory().subscribe((res:any) => {
      this.dataProductCate = res.data;
    })
  }
  deleteProductCategory(id:number | null){
    this.service.deleteCategory(id).subscribe((res:any) => {
      alert(res.msg)
      this.loadData();
    })
  }

}
