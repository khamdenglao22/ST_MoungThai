import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceCountryService } from 'src/app/services/service-country/service-country.service';
import { environment } from 'src/environments/environment';
import { ProvinceService } from '../province.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-province-create',
  templateUrl: './province-create.component.html',
  styleUrls: ['./province-create.component.scss']
})
export class ProvinceCreateComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  dataCountry:any;


  constructor(
    private serviceCountry: ServiceCountryService,
    private service: ProvinceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    prov_name_la: new FormControl('', [Validators.required]),
    prov_name_en: new FormControl('', [Validators.required]),
    country_id: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.serviceCountry.findAllServiceCountry().subscribe((res:any) => {
      this.dataCountry = res.data;
    })
  }

  submit() {
    this.service.createProvince(this.form.value).subscribe((res: any) => {
      if(res.status == 200){
        this.router.navigate(['/province']);
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
