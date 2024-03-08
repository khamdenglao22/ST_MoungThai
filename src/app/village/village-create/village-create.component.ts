import { Component, OnInit } from '@angular/core';
import { DistrictService } from 'src/app/district/district.service';
import { ProvinceService } from 'src/app/province/province.service';
import { ServiceCountryService } from 'src/app/services/service-country/service-country.service';
import { environment } from 'src/environments/environment';
import { VillageService } from '../village.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-village-create',
  templateUrl: './village-create.component.html',
  styleUrls: ['./village-create.component.scss']
})
export class VillageCreateComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataProvince: Array<any> = [];
  dataCountry: Array<any> = [];
  dataDistrict: Array<any> = [];


  constructor(
    private serviceProvince: ProvinceService,
    private serviceCountry: ServiceCountryService,
    private serviceDistrict: DistrictService,
    private serviceApp: AppService,
    private service: VillageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    vill_name_la: new FormControl('', [Validators.required]),
    vill_name_en: new FormControl('', [Validators.required]),
    prov_cd: new FormControl('', [Validators.required]),
    dist_cd: new FormControl('', [Validators.required]),
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
        console.log(res.data)
      });
  }

  onDistrictChange() {
    this.dataDistrict = [];
    this.form.get('dist_cd')?.setValue(null);
    const prov_cd = this.form.get('prov_cd')?.value;
    this.serviceApp.findAllDistrict(prov_cd).subscribe((res: any) => {
      this.dataDistrict = res.data;
      console.log(res.data)
    });
  }

  submit() {
    this.service.createVillage(this.form.value).subscribe((res: any) => {
      if(res.status == 200){
        this.router.navigate(['/village']);
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
