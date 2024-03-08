import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceSectionService } from '../service-section.service';
import { ServiceCountryService } from '../../service-country/service-country.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-section-create',
  templateUrl: './service-section-create.component.html',
  styleUrls: ['./service-section-create.component.scss']
})
export class ServiceSectionCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  service_country: Array<any> = []
  loading = false;

  constructor(
    private service: ServiceSectionService,
    private serviceCountry: ServiceCountryService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    section_name_la: new FormControl('', [Validators.required]),
    section_name_en: new FormControl('', [Validators.required]),
    section_position: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadCountry();
  }

  loadCountry(){
    this.serviceCountry.findAllServiceCountry().subscribe((res:any) => {
      this.service_country = res.data
    })
  }

  submit(){
    this.service.createSection(this.form.value).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + "service-section"])
    },
    (err: any) => {
      this.loading = false;
      const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }
}
