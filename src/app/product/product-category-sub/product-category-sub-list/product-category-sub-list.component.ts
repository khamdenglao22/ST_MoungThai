import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategorySubService } from '../product-category-sub.service';

@Component({
  selector: 'app-product-category-sub-list',
  templateUrl: './product-category-sub-list.component.html',
  styleUrls: ['./product-category-sub-list.component.scss']
})
export class ProductCategorySubListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  displayedColumns = ['product_sub_la','product_sub_en', 'product_cate_la','product_cate_en','p_cate_sub_position', 'edit','delete'];
  loading = false;


  dataProductCateSub: Array<any> = [];


  constructor(private service : ProductCategorySubService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.findAllCategorySub().subscribe((res:any) => {
      this.dataProductCateSub = res.data;
      // console.log(res.data)
    })
  }

  deleteProduct(id:number | null){
    this.service.deleteCategorySub(id).subscribe((res:any) => {
      alert(res.msg)
      this.loadData();
    })
  }
}
