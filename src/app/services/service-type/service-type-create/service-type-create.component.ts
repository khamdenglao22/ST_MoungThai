import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkService } from 'src/app/work/work.service';
import { environment } from 'src/environments/environment';
import { ServiceTypeService } from '../service-type.service';

@Component({
  selector: 'app-service-type-create',
  templateUrl: './service-type-create.component.html',
  styleUrls: ['./service-type-create.component.scss']
})
export class ServiceTypeCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  loading = false;

  constructor(
    private service: ServiceTypeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    service_type_la: new FormControl('', [Validators.required]),
    service_type_en: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {

  }


  submit(){
    this.service.createServiceType(this.form.value).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + "service-type"])
    },
    (err: any) => {
      this.loading = false;
      const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }

}
