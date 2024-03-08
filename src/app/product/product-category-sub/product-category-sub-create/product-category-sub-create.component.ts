import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategorySubService } from '../product-category-sub.service';

@Component({
  selector: 'app-product-category-sub-create',
  templateUrl: './product-category-sub-create.component.html',
  styleUrls: ['./product-category-sub-create.component.scss'],
})
export class ProductCategorySubCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataCate:any;


  constructor(
    private serviceCategory: ProductCategoryService,
    private service: ProductCategorySubService,
    private router: Router
  ) {}

  form = new FormGroup({
    name_la: new FormControl('', [Validators.required]),
    name_en: new FormControl('', [Validators.required]),
    p_cate_id: new FormControl('', [Validators.required]),
    p_cate_sub_position: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.serviceCategory.findAllCategory().subscribe((res:any) => {
      this.dataCate = res.data;
    })
  }

  submit() {
    this.service.createCategorySub(this.form.value).subscribe((res: any) => {
      this.router.navigate(['/product-category-sub']);
    });
  }
}
