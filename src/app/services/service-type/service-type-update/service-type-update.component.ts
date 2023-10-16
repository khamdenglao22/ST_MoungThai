import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceTypeService } from '../service-type.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-type-update',
  templateUrl: './service-type-update.component.html',
  styleUrls: ['./service-type-update.component.scss']
})
export class ServiceTypeUpdateComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  loading = false;
  type_id: number | null;

  constructor(
    private service: ServiceTypeService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    service_type_la: new FormControl('', [Validators.required]),
    service_type_en: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type_id = Number(params.get('id'));
      this.service.findServiceTypeById(this.type_id).subscribe(
        (response: any) => {
          this.form.controls['service_type_la'].setValue(response.data.service_type_la);
          this.form.controls['service_type_en'].setValue(response.data.service_type_en);
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

  submit(){
    this.service.updateServiceType(this.form.value,this.type_id).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + "service-type"])
    },
    (err: any) => {
      this.loading = false;
      const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }

}
