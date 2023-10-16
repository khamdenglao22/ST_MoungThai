import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceSectionService } from '../service-section.service';
import { ServiceCountryService } from '../../service-country/service-country.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-section-update',
  templateUrl: './service-section-update.component.html',
  styleUrls: ['./service-section-update.component.scss']
})
export class ServiceSectionUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  service_country: Array<any> = []
  loading = false;
  service_section_id :number |null;

  constructor(
    private service: ServiceSectionService,
    private serviceCountry: ServiceCountryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    section_name_la: new FormControl('', [Validators.required]),
    section_name_en: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadCountry();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.service_section_id = Number(params.get('id'));
      this.service.findSectionById(this.service_section_id).subscribe(
        (response: any) => {
          this.form.controls['section_name_la'].setValue(response.data.section_name_la);
          this.form.controls['section_name_en'].setValue(response.data.section_name_en);
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

  loadCountry(){
    this.serviceCountry.findAllServiceCountry().subscribe((res:any) => {
      this.service_country = res.data
    })
  }

  submit(){
    this.service.updateSection(this.form.value,this.service_section_id).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + "service-section"])
    },
    (err: any) => {
      this.loading = false;
      const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }
}
