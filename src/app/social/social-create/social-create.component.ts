import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialService } from '../social.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-social-create',
  templateUrl: './social-create.component.html',
  styleUrls: ['./social-create.component.scss']
})
export class SocialCreateComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  loading = false;
  image :any;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private service: SocialService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    social_link: new FormControl('', [Validators.required]),
    social_position: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

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

    this.service.createSocial(formData).subscribe(
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
