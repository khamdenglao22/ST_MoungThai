import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceCountryService } from '../service-country.service';
import { ServiceTypeService } from '../../service-type/service-type.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-country-update',
  templateUrl: './service-country-update.component.html',
  styleUrls: ['./service-country-update.component.scss']
})
export class ServiceCountryUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  service_type: Array<any> = []
  loading = false;
  service_country_id :number | null;

  constructor(
    private service: ServiceCountryService,
    private serviceType: ServiceTypeService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute

  ) {}

  form = new FormGroup({
    country_name_la: new FormControl('', [Validators.required]),
    country_name_en: new FormControl('', [Validators.required]),
    service_type_id: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadServiceType();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.service_country_id = Number(params.get('id'));
      this.service.findServiceCountryById(this.service_country_id).subscribe(
        (response: any) => {
          this.form.controls['country_name_la'].setValue(response.data.country_name_la);
          this.form.controls['country_name_en'].setValue(response.data.country_name_en);
          this.form.controls['service_type_id'].setValue(response.data.service_type_id);
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

  loadServiceType(){
    this.serviceType.findAllServiceType().subscribe((res:any) => {
      this.service_type = res.data
    })
  }

  submit(){
    this.service.updateServiceCountry(this.form.value,this.service_country_id).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + "service-country"])
    },
    (err: any) => {
      this.loading = false;
      const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }
}
