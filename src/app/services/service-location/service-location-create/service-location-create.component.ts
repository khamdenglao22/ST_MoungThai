import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceLocationService } from '../service-location.service';
import { ServiceTypeService } from '../../service-type/service-type.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceCountryService } from '../../service-country/service-country.service';
import { ServiceSectionService } from '../../service-section/service-section.service';
import { ProvinceService } from 'src/app/province/province.service';

@Component({
  selector: 'app-service-location-create',
  templateUrl: './service-location-create.component.html',
  styleUrls: ['./service-location-create.component.scss'],
})
export class ServiceLocationCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  service_type: Array<any> = [];
  service_country: Array<any> = [];
  service_section: Array<any> = [];
  loading = false;
  isThai = false;
  isLao = false;
  provinces: any[] = [];
  districts: any[] = [];
  villages: any[] = [];

  constructor(
    private service: ServiceLocationService,
    private serviceType: ServiceTypeService,
    private serviceCountry: ServiceCountryService,
    private serviceSection: ServiceSectionService,
    private appService: AppService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private serviceProvince: ProvinceService
  ) {}

  form = new FormGroup({
    location_name_la: new FormControl(null, [Validators.required]),
    location_name_en: new FormControl(null, [Validators.required]),
    tel: new FormControl(''),
    phone: new FormControl(''),
    service_type_id: new FormControl(null, [Validators.required]),
    service_country_id: new FormControl(null, [Validators.required]),
    service_section_id: new FormControl(null, [Validators.required]),
    prov_cd: new FormControl(null, [Validators.required]),
    dist_cd: new FormControl(null, [Validators.required]),
    vill_cd: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.loadProvince();
    this.loadServiceType();
  }

  loadServiceType() {
    this.serviceType.findAllServiceType().subscribe((res: any) => {
      this.service_type = res.data;
    });
  }

  loadProvince() {
    this.appService.findAllProvince().subscribe((res: any) => {
      this.provinces = res.data;
    });
  }

  onCountryChange() {
    this.service_country = [];
    this.form.get('service_section_id')?.setValue(null);
    const service_type_id = this.form.get('service_type_id')?.value;
    this.serviceCountry
      .findAllServiceCountryOnChange(service_type_id)
      .subscribe((res: any) => {
        this.service_country = res.data;
      });
  }

  onSectionChange() {
    this.service_section = [];
    let service_country_id = this.form.get('service_country_id')?.value;

    if (service_country_id == 4) {
      this.isThai = true;
      this.isLao = false;

      // console.log("isThai",this.isThai)
    } else {
      this.isThai = false;
      this.isLao = true;
    }

    this.serviceSection
      .findAllSectionOnChange(service_country_id)
      .subscribe((res: any) => {
        this.service_section = res.data;
      });

    if (service_country_id == 6) {
      service_country_id = 5;
    }

    this.provinces = [];
    this.serviceProvince
      .findAllProvinceByCountry(service_country_id)
      .subscribe((res: any) => {
        this.provinces = res.data;
        // console.log(res.data)
      });
  }

  onProvinceChange() {
    this.districts = [];
    this.villages = [];
    this.form.get('dist_cd')?.setValue(null);
    this.form.get('vill_cd')?.setValue(null);

    const prov_cd = this.form.get('prov_cd')?.value;
    this.appService.findAllDistrict(prov_cd).subscribe((res: any) => {
      this.districts = res.data;
    });
  }

  onDistrictChange() {
    this.villages = [];
    this.form.get('vill_cd')?.setValue(null);
    const dist_cd = this.form.get('dist_cd')?.value;
    this.appService.findAllVillage(dist_cd).subscribe((res: any) => {
      this.villages = res.data;
    });
  }

  submit() {
    this.service
      .createLocation({
        location_name_la: this.form.value.location_name_la,
        location_name_en: this.form.value.location_name_en,
        tel: this.form.value.tel,
        phone: this.form.value.phone,
        section_id: this.form.value.service_section_id,
        village_id: this.form.value.vill_cd,
        province_id: this.form.value.prov_cd,
        district_id: this.form.value.dist_cd,
        country_id: this.form.value.service_country_id,
      })
      .subscribe((res: any) => {
        this.router.navigate([this.baseUrl + 'service-location']);
      });
  }
}
