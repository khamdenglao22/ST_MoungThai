import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategoryService } from '../product-category.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-category-update',
  templateUrl: './product-category-update.component.html',
  styleUrls: ['./product-category-update.component.scss'],
})
export class ProductCategoryUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  cate_id: number | null;

  constructor(
    private service: ProductCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    name_la: new FormControl('', [Validators.required]),
    name_en: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.cate_id = Number(params.get('id'));
      this.service.findCategoryById(this.cate_id).subscribe(
        (response: any) => {
          this.form.controls['name_la'].setValue(response.data.name_la);
          this.form.controls['name_en'].setValue(response.data.name_en);
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
    this.service
      .updateCategory(this.form.value, this.cate_id)
      .subscribe((res: any) => {
        this.router.navigate(['/product-category']);
      });
  }
}
