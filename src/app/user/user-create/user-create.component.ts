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
    fullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role_id: new FormControl('', [Validators.required]),
    store_id: new FormControl(null),
    organization_id: new FormControl(null),
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

    // if (this.role?.value == 14) {
    //   this.store?.addValidators(Validators.required);
    //   this.store?.updateValueAndValidity();
    // } else {
    //   this.store?.setValue(null);
    // }

    // if (this.role?.value == 19) {
    //   this.organization_id?.addValidators(Validators.required);
    //   this.organization_id?.updateValueAndValidity();
    // } else {
    //   this.organization_id?.setValue(null);
    // }

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
