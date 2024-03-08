import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ProvinceService } from 'src/app/province/province.service';
import { ServiceCountryService } from 'src/app/services/service-country/service-country.service';
import { VillageService } from '../village.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-village-update',
  templateUrl: './village-update.component.html',
  styleUrls: ['./village-update.component.scss']
})
export class VillageUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataProvince: Array<any> = [];
  dataCountry: Array<any> = [];
  dataDistrict: Array<any> = [];
  vill_cd:any;


  constructor(
    private serviceProvince: ProvinceService,
    private serviceCountry: ServiceCountryService,
    private serviceApp: AppService,
    private service: VillageService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.vill_cd = Number(params.get('id'));
      this.service.findVillageById(this.vill_cd).subscribe(
        (response: any) => {

          this.form.controls['vill_name_la'].setValue(response.data.vill_name_la);
          this.form.controls['vill_name_en'].setValue(response.data.vill_name_en);
          this.form.controls['country_id'].setValue(response.data.Province.country_id);
          this.onChangeProvinceByCountry();
          this.form.controls['prov_cd'].setValue(response.data.prov_cd);
          this.onDistrictChange();
          this.form.controls['dist_cd'].setValue(response.data.dist_cd);

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
    this.service.updateVillage(this.form.value,this.vill_cd).subscribe((res: any) => {
      this.router.navigate(['/village']);
    });
  }

}
