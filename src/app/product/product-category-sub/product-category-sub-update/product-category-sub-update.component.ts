import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { ProductCategorySubService } from '../product-category-sub.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-category-sub-update',
  templateUrl: './product-category-sub-update.component.html',
  styleUrls: ['./product-category-sub-update.component.scss']
})
export class ProductCategorySubUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataCate:any;
  sub_id: number | null;


  constructor(
    private serviceCategory: ProductCategoryService,
    private service: ProductCategorySubService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
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

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sub_id = Number(params.get('id'));
      this.service.findCategorySubById(this.sub_id).subscribe(
        (response: any) => {
          this.form.controls['name_la'].setValue(response.data.name_la);
          this.form.controls['name_en'].setValue(response.data.name_en);
          this.form.controls['p_cate_id'].setValue(response.data.p_cate_id);
          this.form.controls['p_cate_sub_position'].setValue(response.data.p_cate_sub_position);
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
          const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
          this._snackBar.open(message, '', { duration: 3000 });
        }
      );
    });
  }

  submit() {
    this.service.updateCategorySub(this.form.value,this.sub_id).subscribe((res: any) => {
      this.router.navigate(['/product-category-sub']);
    });
  }
}
