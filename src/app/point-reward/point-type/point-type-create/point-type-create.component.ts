import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { PointTypeService } from '../point-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-point-type-create',
  templateUrl: './point-type-create.component.html',
  styleUrls: ['./point-type-create.component.scss'],
})
export class PointTypeCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;

  constructor(private service: PointTypeService, private router: Router) {}

  ngOnInit(): void {}

  form = new FormGroup({
    PointMethod: new FormControl('', [Validators.required]),
    PointTypeDesc: new FormControl('', [Validators.required]),
    PointPercent: new FormControl('', [Validators.required]),
    CompanyId: new FormControl(1),
  });

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    let pointPercent = this.form.value.PointPercent.toString().replace(
      '.',
      ','
    );

    this.service
      .createPointType({
        PointMethod: this.form.value.PointMethod,
        PointTypeDesc: this.form.value.PointTypeDesc,
        PointPercent: pointPercent,
        CompanyId: this.form.value.CompanyId,
      })
      .subscribe((res: any) => {
        this.router.navigate([this.baseUrl + '/point-type']);
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
      });
  }
}
