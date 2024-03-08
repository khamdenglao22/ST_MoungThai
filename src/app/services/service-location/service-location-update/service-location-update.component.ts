import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceLocationService } from '../service-location.service';
import { ServiceTypeService } from '../../service-type/service-type.service';
import { ServiceCountryService } from '../../service-country/service-country.service';
import { ServiceSectionService } from '../../service-section/service-section.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProvinceService } from 'src/app/province/province.service';

@Component({
  selector: 'app-service-location-update',
  templateUrl: './service-location-update.component.html',
  styleUrls: ['./service-location-update.component.scss'],
})
export class ServiceLocationUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  service_type: Array<any> = [];
  service_country: Array<any> = [];
  service_section: Array<any> = [];
  dataLocation: any;
  loading = false;
  isThai = false;
  isLao = false;
  provinces: any[] = [];
  districts: any[] = [];
  villages: any[] = [];
  location_id: number | null;

  constructor(
    private service: ServiceLocationService,
    private serviceType: ServiceTypeService,
    private serviceCountry: ServiceCountryService,
    private serviceSection: ServiceSectionService,
    private appService: AppService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private serviceProvince: ProvinceService
  ) {}

  form = new FormGroup({
    location_name_la: new FormControl(null, [Validators.required]),
    location_name_en: new FormControl(null, [Validators.required]),
    tel: new FormControl(null),
    phone: new FormControl(null),
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

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.location_id = Number(params.get('id'));
      this.service
        .findLocationById(this.location_id)
        .subscribe((response: any) => {
          this.dataLocation = response.data;
          // console.log("section = "+this.dataLocation.section_id)
          this.form
            .get('location_name_la')
            ?.setValue(this.dataLocation.location_name_la);
          this.form
            .get('location_name_en')
            ?.setValue(this.dataLocation.location_name_en);
          this.form.get('tel')?.setValue(this.dataLocation.tel);
          this.form.get('phone')?.setValue(this.dataLocation.phone);
          this.form
            .get('service_type_id')
            ?.setValue(this.dataLocation.Country.service_type_id);
          this.onCountryChange();
          this.form
            .get('service_country_id')
            ?.setValue(this.dataLocation.country_id);
          this.onSectionChange();
          if (this.dataLocation.section_id != null) {
            this.form
              .get('service_section_id')
              ?.setValue(this.dataLocation.servicesSection.id);
          }
          if (this.dataLocation.province_id != null) {
            this.form.get('prov_cd')?.setValue(this.dataLocation.province_id);
            this.onProvinceChange();
            this.form.get('dist_cd')?.setValue(this.dataLocation.district_id);
            this.onDistrictChange();
          }
          if (this.dataLocation.village_id != null) {
            this.form.get('vill_cd')?.setValue(this.dataLocation.village_id);
          }
        });
    });
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
      this.form.get('service_section_id')?.setValue(null);
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
      .updateLocation(
        {
          location_name_la: this.form.value.location_name_la,
          location_name_en: this.form.value.location_name_en,
          tel: this.form.value.tel,
          phone: this.form.value.phone,
          section_id: this.form.value.service_section_id,
          country_id: this.form.value.service_country_id,
          village_id: this.form.value.vill_cd,
          province_id: this.form.value.prov_cd,
          district_id: this.form.value.dist_cd,
        },
        this.location_id
      )
      .subscribe((res: any) => {
        console.log(res);
        this.router.navigate([this.baseUrl + 'service-location']);
      });
  }
}
