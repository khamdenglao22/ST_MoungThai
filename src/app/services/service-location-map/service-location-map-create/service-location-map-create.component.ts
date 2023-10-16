import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceLocationMapService } from '../service-location-map.service';
import { ServiceTypeService } from '../../service-type/service-type.service';
import { ServiceCountryService } from '../../service-country/service-country.service';
import { ServiceSectionService } from '../../service-section/service-section.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-location-map-create',
  templateUrl: './service-location-map-create.component.html',
  styleUrls: ['./service-location-map-create.component.scss'],
})
export class ServiceLocationMapCreateComponent implements OnInit {
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
  image: any;

  constructor(
    private service: ServiceLocationMapService,
    private serviceType: ServiceTypeService,
    private serviceCountry: ServiceCountryService,
    private serviceSection: ServiceSectionService,
    private appService: AppService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    service_type_id: new FormControl(null, [Validators.required]),
    service_country_id: new FormControl(null, [Validators.required]),
    service_section_id: new FormControl(null, [Validators.required]),
    prov_cd: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.loadProvince();
    this.loadServiceType();
  }

  onLogoChange(event: any) {
    this.image = event.target.files[0];
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
    // this.form.get('service_section_id')?.setValue(null);
    const service_type_id = this.form.get('service_type_id')?.value;
    this.serviceCountry
      .findAllServiceCountryOnChange(service_type_id)
      .subscribe((res: any) => {
        this.service_country = res.data;
      });
  }

  onSectionChange() {
    this.service_section = [];
    const service_country_id = this.form.get('service_country_id')?.value;
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
  }

  submit() {
    console.log(this.form.value);

    let formData = new FormData();
    formData.append('section_id', this.form.value.service_section_id);
    formData.append('province_id', this.form.value.prov_cd);
    formData.append('country_id', this.form.value.service_country_id);
    formData.append('image', this.image);
    this.service.createMap(formData).subscribe((res: any) => {
      this.router.navigate([this.baseUrl + 'service-location-map/list']);
    });
  }
}
