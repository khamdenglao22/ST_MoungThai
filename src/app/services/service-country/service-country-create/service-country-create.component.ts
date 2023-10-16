import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceCountryService } from '../service-country.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceTypeService } from '../../service-type/service-type.service';

@Component({
  selector: 'app-service-country-create',
  templateUrl: './service-country-create.component.html',
  styleUrls: ['./service-country-create.component.scss']
})
export class ServiceCountryCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  service_type: Array<any> = []
  loading = false;

  constructor(
    private service: ServiceCountryService,
    private serviceType: ServiceTypeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    country_name_la: new FormControl('', [Validators.required]),
    country_name_en: new FormControl('', [Validators.required]),
    service_type_id: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadServiceType();
  }

  loadServiceType(){
    this.serviceType.findAllServiceType().subscribe((res:any) => {
      this.service_type = res.data
    })
  }


  submit(){
    this.loading = true

    this.service.createServiceCountry(this.form.value).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + "service-country"])
      this.loading = false;
    },
    (err: any) => {
      this.loading = false;
      const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }
}
