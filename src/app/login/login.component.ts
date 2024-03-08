import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : ''

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

  login() {
    this.loading = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    const request = this.authService.login(this.username?.value, this.password?.value);
    request.subscribe((response:any) => {
      localStorage.setItem("token", response.token);
      this.loading = false;
      window.location.href = '/backoffice'
    }, error => {
      this.loading = false;
      let msg = error?.msg || "ເກີດຂໍ້ຜິດພາດບາງຢ່າງ";
      this.snackBar.open(msg, '', {
        verticalPosition: 'top',
        duration: 2000
      });
    });
  }

}
