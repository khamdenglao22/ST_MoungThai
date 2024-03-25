import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategorySubService } from '../../product-category-sub/product-category-sub.service';

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
    'p_order',
    'edit',
    'delete',
  ];
  loading = false;

  dataProduct: Array<any> = [];
  dataProductCateSub: Array<any> = [];

  constructor(private service: ProductService,private serviceProductSub : ProductCategorySubService) {}

  form: FormGroup = new FormGroup({
    p_name: new FormControl(''),
    p_cate_sub_id: new FormControl(''),
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllProduct().subscribe((res: any) => {
      this.dataProduct = res.data;
      // console.log(res.data)
    });

    this.serviceProductSub.findAllCategorySub().subscribe((res:any) => {
      this.dataProductCateSub = res.data;
      // console.log(res.data)
    })
  }

  deleteProduct(id: number | null) {
    this.service.deleteProduct(id).subscribe((res: any) => {
      alert(res.msg);
      this.loadData();
    });
  }

  searchSubmit(){
    this.service.searchProduct(this.form.value).subscribe((res:any) => {
      this.dataProduct = res.data;
    })
  }


}
