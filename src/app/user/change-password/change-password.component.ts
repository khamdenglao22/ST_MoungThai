import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : ''
  loading = false
  userId: number | null = null

  form = new FormGroup({
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = Number(params.get('id'))
    })
  }

  submit() {
    this.loading = true

    if (this.form.invalid) {
      this.loading = false
      return
    }

    this.service.changePassword(this.userId, this.form.value).subscribe((response: any) => {
      this.router.navigate([this.baseUrl + '/users'])
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      const message = err.error.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }
}
