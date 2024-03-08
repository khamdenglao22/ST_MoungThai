import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerAdvertisingService } from '../banner-advertising.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner-advertising-create',
  templateUrl: './banner-advertising-create.component.html',
  styleUrls: ['./banner-advertising-create.component.scss']
})
export class BannerAdvertisingCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  image: any;
  loading: false;

  constructor(
    private service: BannerAdvertisingService,
    private router: Router
  ) {}

  // banner_position

  form = new FormGroup({
    banner_advertising_position: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onLogoChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    let formData = new FormData();
    formData.append('banner_advertising_position', this.form.value.banner_advertising_position);
    formData.append('image', this.image);
    this.service.createNewBannerAdvertising(formData).subscribe((res:any) =>{
      this.router.navigate([ this.baseUrl + "/banner-advertising"])
    })
  }
}
