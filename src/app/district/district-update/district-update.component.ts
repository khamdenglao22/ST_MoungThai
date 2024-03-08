import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProvinceService } from 'src/app/province/province.service';
import { ServiceCountryService } from 'src/app/services/service-country/service-country.service';
import { DistrictService } from '../district.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-district-update',
  templateUrl: './district-update.component.html',
  styleUrls: ['./district-update.component.scss']
})
export class DistrictUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataProvince: Array<any> = [];
  dataCountry: Array<any> = [];
  dist_cd: any;

  constructor(
    private serviceProvince: ProvinceService,
    private serviceCountry: ServiceCountryService,
    private service: DistrictService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dist_cd = Number(params.get('id'));
      this.service.findDistrictById(this.dist_cd).subscribe(
        (response: any) => {
          this.form.controls['dist_name_la'].setValue(response.data.dist_name_la);
          this.form.controls['dist_name_en'].setValue(response.data.dist_name_en);
          this.form.controls['country_id'].setValue(response.data.Province.country_id);
          this.onChangeProvinceByCountry();
          this.form.controls['prov_cd'].setValue(response.data.prov_cd);
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

  submit() {
    this.service.updateDistrict(this.form.value,this.dist_cd).subscribe((res: any) => {
      this.router.navigate(['/district']);
    });
  }

}
