import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BannerService } from '../banner.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.scss'],
})
export class BannerCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  image: any;
  loading: false;

  constructor(
    private service: BannerService,
    private router: Router
  ) {}

  // banner_position

  form = new FormGroup({
    banner_position: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onLogoChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    let formData = new FormData();
    formData.append('banner_position', this.form.value.banner_position);
    formData.append('image', this.image);
    this.service.createNewBanner(formData).subscribe((res:any) =>{
      this.router.navigate([ this.baseUrl + "/banner"])
    })
  }
}
