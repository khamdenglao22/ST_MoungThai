import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/menu/menu.service';
import { RoleService } from '../role.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss'],
})
export class RoleCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  permissions: Array<any> = [];
  form = new FormGroup({
    role_name: new FormControl('', [Validators.required]),
    // can_access_web: new FormControl(true, [Validators.required]),
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

    this.menuService.findAllMenu().subscribe(
      (response: any) => {
        this.permissions = response.data.map((menu: any) => {
          return {
            menu_id: menu.id,
            menu_name: menu.menu_name,
            can_create: false,
            can_update: false,
            can_read: false,
            can_delete: false,
          };
        });
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    const data = {
      role_name: this.form.controls['role_name'].value,
      // can_access_web: this.form.controls['can_access_web'].value,
      permissions: this.permissions.map((permission: any) => {
        const _permission = { ...permission };
        delete _permission.menu_name;
        return _permission;
      }),
    };

    this.service.createRole(data).subscribe(
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
