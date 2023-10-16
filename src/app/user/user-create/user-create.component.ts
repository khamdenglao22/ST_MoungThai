import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/role/role.service';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  roles: Array<any> = [];

  organizations: any[] = [];

  form = new FormGroup({
    fullname_la: new FormControl('', [Validators.required]),
    fullname_en: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private roleService: RoleService,
    private service: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roleService.findAllRole().subscribe((response: any) => {
      this.roles = response.data;
    });
  }

  get role() {
    return this.form.get('role_id');
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.service.createUser(this.form.value).subscribe(
      (response: any) => {
        this.router.navigate([this.baseUrl + '/users']);
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
