import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PushNotificationService } from '../push-notification.service';

@Component({
  selector: 'app-push-notification-create',
  templateUrl: './push-notification-create.component.html',
  styleUrls: ['./push-notification-create.component.scss']
})
export class PushNotificationCreateComponent implements OnInit {

  loading = false
  image: any
  imageError = false

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });

  constructor(
    private service: PushNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
  }

  get target() {
    return this.form.controls['target']
  }

  onFileChange(event: any) {
    this.image = event.target.files[0]
  }

  submit() {
    this.loading = true
    this.imageError = false

    if (this.form.invalid) {
      this.loading = false;
      return
    }

    if (!this.image) {
      this.imageError = true
      this.loading = false
      alert("ກະລຸນາເລືອກຮູບພາບ")
      return
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(this.image.type)) {
      this.imageError = true
      this.loading = false
      alert("ຕ້ອງເປັນໄຟລ jpg, jpeg, png ເທົ່ານັ້ນ")
      return
    }

    let formData = new FormData()
    formData.append('title', this.form.value.title)
    formData.append('body', this.form.value.body)
    formData.append('image', this.image)

    this.service.sendPushNotification(formData).subscribe((response: any) => {
      this.loading = false;
      this._snackBar.open("ສົ່ງ Push Notification ສຳເລັດ", '', { duration: 3000 });
    }, (err: any) => {
      this.loading = false;
      const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }

}
