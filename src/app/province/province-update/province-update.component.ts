import { Component, OnInit } from '@angular/core';
import { ServiceCountryService } from 'src/app/services/service-country/service-country.service';
import { environment } from 'src/environments/environment';
import { ProvinceService } from '../province.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-province-update',
  templateUrl: './province-update.component.html',
  styleUrls: ['./province-update.component.scss']
})
export class ProvinceUpdateComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataCountry:any;
  prov_cd:any


  constructor(
    private serviceCountry: ServiceCountryService,
    private service: ProvinceService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    prov_name_la: new FormControl('', [Validators.required]),
    prov_name_en: new FormControl('', [Validators.required]),
    country_id: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.serviceCountry.findAllServiceCountry().subscribe((res:any) => {
      this.dataCountry = res.data;
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.prov_cd = Number(params.get('id'));
      this.service.findProvinceById(this.prov_cd).subscribe(
        (response: any) => {
          this.form.controls['prov_name_la'].setValue(response.data.prov_name_la);
          this.form.controls['prov_name_en'].setValue(response.data.prov_name_en);
          this.form.controls['country_id'].setValue(response.data.country_id);
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
    this.service.updateProvince(this.form.value,this.prov_cd).subscribe((res: any) => {
      this.router.navigate(['/province']);
    });
  }
}
