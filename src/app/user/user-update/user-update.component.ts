import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RoleService } from 'src/app/role/role.service';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  userId: number | null = null;
  roles: Array<any> = [];

  organizations: any[] = [];

  form = new FormGroup({
    fullname_la: new FormControl('', [Validators.required]),
    fullname_en: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    role_id: new FormControl('', [Validators.required]),
    active: new FormControl(false, [Validators.required]),
  });

  constructor(
    private roleService: RoleService,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roleService.findAllRole().subscribe((response: any) => {
      this.roles = response.data;
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.userId = Number(params.get('id'));
        this.service.findUserByIdOrUsername(this.userId).subscribe(
          (response: any) => {
            this.form.controls['fullname_la'].setValue(response.data.fullname_la);
            this.form.controls['fullname_en'].setValue(response.data.fullname_en);
            this.form.controls['username'].setValue(response.data.username);
            this.form.controls['role_id'].setValue(response.data.role.id);
            this.form.controls['active'].setValue(response.data.active);
            this.loading = false;
          },
          (err: any) => {
            this.loading = false;
            const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
            this._snackBar.open(message, '', { duration: 3000 });
          }
        );
      });
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

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.service.updateUser(this.userId, this.form.value).subscribe(
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
