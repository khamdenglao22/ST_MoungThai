import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MenuService } from 'src/app/menu/menu.service';
import { RoleService } from '../role.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss'],
})
export class RoleUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  role: any;
  roleId: any;
  permissions: Array<any> = [];
  form = new FormGroup({
    role_name_la: new FormControl('', [Validators.required]),
    role_name_en: new FormControl('', [Validators.required]),
  });

  constructor(
    private service: RoleService,
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.roleId = Number(params.get('id'));
      this.service.findRoleById(this.roleId).subscribe((response: any) => {
        this.role = response.data;
        this.form.controls['role_name_la'].setValue(this.role.role_name_la);
        this.form.controls['role_name_en'].setValue(this.role.role_name_en);
        this.loading = false;
      });
    });
    this.loading = false;
  }

  submit() {
    this.loading = true;
    if (this.form.invalid) {
      this.loading = false;
      return;
    }
    this.service.updateRole(this.roleId, this.form.value).subscribe(
      (response: any) => {
        this.router.navigate([this.baseUrl + '/role']);
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
