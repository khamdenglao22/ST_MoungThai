import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PushNotificationSettingService } from '../push-notification-setting.service';

@Component({
  selector: 'app-push-notification-setting-update',
  templateUrl: './push-notification-setting-update.component.html',
  styleUrls: ['./push-notification-setting-update.component.scss'],
})
export class PushNotificationSettingUpdateComponent implements OnInit {
  loading = false;
  dataId: any;
  pushNotificationSetting: any;
  image: any;
  imageUrl: any;
  imageError = false;
  orderStatus: any[] = [];

  form = new FormGroup({
    order_status_id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    send_to_store: new FormControl(false, [Validators.required]),
    send_to_delivery: new FormControl(false, [Validators.required]),
    send_to_customer: new FormControl(false, [Validators.required]),
    image: new FormControl(''),
  });

  constructor(
    private service: PushNotificationSettingService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dataId = Number(params.get('id'));
      this.service.findPushNotificationSettingById(this.dataId).subscribe(
        (response: any) => {
          this.pushNotificationSetting = response;
          this.form.controls['order_status_id'].setValue(
            this.pushNotificationSetting.order_status_id
          );
          this.form.controls['title'].setValue(
            this.pushNotificationSetting.title
          );
          this.form.controls['body'].setValue(
            this.pushNotificationSetting.body
          );
          this.form.controls['send_to_store'].setValue(
            this.pushNotificationSetting.send_to_store
          );
          this.form.controls['send_to_delivery'].setValue(
            this.pushNotificationSetting.send_to_delivery
          );
          this.form.controls['send_to_customer'].setValue(
            this.pushNotificationSetting.send_to_customer
          );
          this.imageUrl = this.pushNotificationSetting.image;
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

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    this.loading = true;
    this.imageError = false;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    if (
      this.image &&
      !['image/jpeg', 'image/png', 'image/jpg'].includes(this.image.type)
    ) {
      this.imageError = true;
      this.loading = false;
      alert('ຕ້ອງເປັນໄຟລ jpg, jpeg, png ເທົ່ານັ້ນ');
      return;
    }

    let formData = new FormData();
    formData.append('order_status_id', this.form.value.order_status_id);
    formData.append('title', this.form.value.title);
    formData.append('body', this.form.value.body);
    formData.append('send_to_store', this.form.value.send_to_store);
    formData.append('send_to_delivery', this.form.value.send_to_delivery);
    formData.append('send_to_customer', this.form.value.send_to_customer);
    if (this.image) {
      formData.append('image', this.image);
    }

    this.service.updatePushNotificationSetting(this.dataId, formData).subscribe(
      (response: any) => {
        this.router.navigate(['/push-notification-setting']);
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
