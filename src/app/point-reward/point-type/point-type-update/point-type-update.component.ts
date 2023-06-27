import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { PointTypeService } from '../point-type.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-point-type-update',
  templateUrl: './point-type-update.component.html',
  styleUrls: ['./point-type-update.component.scss'],
})
export class PointTypeUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  pointTypeId: number | null = null;
  pointType: Array<any> = [];

  constructor(
    private service: PointTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    PointMethod: new FormControl('', [Validators.required]),
    PointTypeDesc: new FormControl('', [Validators.required]),
    PointPercent: new FormControl('', [Validators.required]),
    CompanyId: new FormControl(1),
  });

  ngOnInit(): void {
    this.service.findPointType().subscribe((response: any) => {
      this.pointType = response.data;
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.pointTypeId = Number(params.get('id'));
        this.service.findPointTypeById(this.pointTypeId).subscribe(
          (response: any) => {
            // console.log(response)
            this.form.controls["PointMethod"].setValue(response.pointMethod)
            this.form.controls["PointTypeDesc"].setValue(response.pointTypeDesc)
            this.form.controls["PointPercent"].setValue(response.pointPercent)
            this.loading = false;
          },
          (err: any) => {
            this.loading = false;
            const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
            this._snackBar.open(message, '', { duration: 3000 });
          }
        );
      });
    });
  }

  submit() {
    // console.log(this.form.value)
    let pointPercent = this.form.value.PointPercent.toString().replace('.',',')

    this.service.updatePointType(this.pointTypeId,
       {
        PointTypeId:this.pointTypeId,
        PointMethod:this.form.value.PointMethod,
        PointTypeDesc:this.form.value.PointTypeDesc,
        PointPercent:pointPercent,
        CompanyId:this.form.value.CompanyId,
        }).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + '/point-type'])
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }
}
