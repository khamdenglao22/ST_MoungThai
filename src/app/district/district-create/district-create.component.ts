import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvinceService } from 'src/app/province/province.service';
import { environment } from 'src/environments/environment';
import { DistrictService } from '../district.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceCountryService } from 'src/app/services/service-country/service-country.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-district-create',
  templateUrl: './district-create.component.html',
  styleUrls: ['./district-create.component.scss']
})
export class DistrictCreateComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataProvince: Array<any> = [];
  dataCountry: Array<any> = [];


  constructor(
    private serviceProvince: ProvinceService,
    private serviceCountry: ServiceCountryService,
    private service: DistrictService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    dist_name_la: new FormControl('', [Validators.required]),
    dist_name_en: new FormControl('', [Validators.required]),
    prov_cd: new FormControl('', [Validators.required]),
    country_id:new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.serviceCountry.findAllServiceCountry().subscribe((res:any) => {
      this.dataCountry = res.data;
    })
  }

  onChangeProvinceByCountry() {
    this.dataProvince = [];
    const country_id = this.form.get('country_id')?.value;
    this.serviceProvince
      .findAllProvinceByCountry(country_id)
      .subscribe((res: any) => {
        this.dataProvince = res.data;
        // console.log(res.data)
      });
  }

  submit() {
    this.service.createDistrict(this.form.value).subscribe((res: any) => {
      if(res.status ==200){
        this.router.navigate(['/district']);
      }else{
        // alert(res.msg)
        this._snackBar.open(res.msg, 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
}
