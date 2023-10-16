import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ServiceLocationMapService } from '../service-location-map.service';
import { ServiceTypeService } from '../../service-type/service-type.service';
import { ServiceCountryService } from '../../service-country/service-country.service';
import { ServiceSectionService } from '../../service-section/service-section.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-location-map-update',
  templateUrl: './service-location-map-update.component.html',
  styleUrls: ['./service-location-map-update.component.scss'],
})
export class ServiceLocationMapUpdateComponent implements OnInit {
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
  imageUrl: any;
  map_id: any;

  constructor(
    private service: ServiceLocationMapService,
    private serviceType: ServiceTypeService,
    private serviceCountry: ServiceCountryService,
    private serviceSection: ServiceSectionService,
    private appService: AppService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    service_type_id: new FormControl(null, [Validators.required]),
    service_country_id: new FormControl(null, [Validators.required]),
    service_section_id: new FormControl(null, [Validators.required]),
    prov_cd: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.map_id = Number(params.get('id'));
      // console.log(this.map_id)
      this.service.findMapById(this.map_id).subscribe(
        (response: any) => {
          this.form.controls['service_type_id'].setValue(
            response.data.Country.service_type_id
          );
          this.onCountryChange();
          this.form.controls['service_country_id'].setValue(
            response.data.country_id
          );
          this.onSectionChange();
          if (response.data.Section != null) {
            this.form
              .get('service_section_id')
              ?.setValue(response.data.Section.id);
          }
          if (response.data.Province != null) {
            this.form.controls['prov_cd'].setValue(
              response.data.Province.prov_cd
            );
          }
          this.imageUrl = response.data.image;

          // console.log(response);
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
          const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
          this._snackBar.open(message, '', { duration: 3000 });
        }
      );
    });

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
    const service_country_id = this.form.get('service_country_id')?.value;

    if (service_country_id == 4) {
      this.isThai = true;
      this.isLao = false;
      this.form.get('prov_cd')?.setValue(null);

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
  }

  submit() {
    let formData = new FormData();
    formData.append('section_id', this.form.value.service_section_id);
    formData.append('province_id', this.form.value.prov_cd);
    formData.append('country_id', this.form.value.service_country_id);
    formData.append('image', this.image);
    this.service.updateMap(formData, this.map_id).subscribe((res: any) => {
      this.router.navigate([this.baseUrl + 'service-location-map/list']);
    });
  }
}
