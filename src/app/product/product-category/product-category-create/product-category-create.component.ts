import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProductCategoryService } from '../product-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-category-create',
  templateUrl: './product-category-create.component.html',
  styleUrls: ['./product-category-create.component.scss']
})
export class ProductCategoryCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;


  constructor(private service : ProductCategoryService,private router : Router) { }


  form = new FormGroup({
    name_la: new FormControl('', [Validators.required]),
    name_en: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }

  submit(){
    this.service.createCategory(this.form.value).subscribe((res:any) => {
      this.router.navigate(['/product-category']);
    })
  }

}
