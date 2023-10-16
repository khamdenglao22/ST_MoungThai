import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-social-update',
  templateUrl: './social-update.component.html',
  styleUrls: ['./social-update.component.scss']
})
export class SocialUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  social_id: number | null;
  loading = false;
  image :any;
  imageUrl:any;

  constructor(
    private service: SocialService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  form = new FormGroup({
    social_link: new FormControl('', [Validators.required]),
    social_position: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.social_id = Number(params.get('id'));
      this.service.findSocialById(this.social_id).subscribe(
        (response: any) => {
          this.form.controls['social_link'].setValue(response.data.social_link);
          this.form.controls['social_position'].setValue(response.data.social_position);
          this.imageUrl =response.data.image
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

  onLogoChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    let formData = new FormData();
    formData.append('social_link', this.form.value.social_link);
    formData.append('social_position', this.form.value.social_position);
    formData.append('image', this.image);

    this.service.updateSocial(formData,this.social_id).subscribe(
      (response: any) => {
        this.router.navigate([this.baseUrl + '/social']);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
        this._snackBar.open(message, '', { duration: 3000 });
      }
    );
  }
}
