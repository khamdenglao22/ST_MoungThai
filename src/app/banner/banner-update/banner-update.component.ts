import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BannerService } from '../banner.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner-update',
  templateUrl: './banner-update.component.html',
  styleUrls: ['./banner-update.component.scss']
})
export class BannerUpdateComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  image: any;
  loading: false;
  imageUrl:any;
  banner_Id: number | null

  constructor(
    private service: BannerService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  form = new FormGroup({
    banner_position: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.banner_Id = Number(params.get('id'))
      this.service.findAllBannerById(this.banner_Id).subscribe((response: any) => {
        this.form.controls['banner_position'].setValue(response.data.banner_position);
        this.imageUrl = response.data.image
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
        const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
        this._snackBar.open(message, '', { duration: 3000 });
      })
    })
  }

  onLogoChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    let formData = new FormData();
    formData.append('banner_position', this.form.value.banner_position);
    formData.append('image', this.image);
    this.service.updateBanner(formData,this.banner_Id).subscribe((res:any) =>{
      this.router.navigate([ this.baseUrl + "/banner"])
    })
  }
}
