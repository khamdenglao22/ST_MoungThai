import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MenuService } from 'src/app/menu/menu.service';
import { RoleService } from '../role.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : ''
  loading = false
  role: any
  roleId: any
  permissions: Array<any> = []
  form = new FormGroup({
    role_name: new FormControl('', [Validators.required]),
    can_access_web: new FormControl(null, [Validators.required]),
  });

  constructor(
    private service: RoleService,
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.menuService.findAllMenu().subscribe((response:any) => {
      this.permissions = response.data.map((menu: any) => {
        return { menu_id: menu.id, menu_name: menu.menu_name, 
          can_create: false, can_update: false,
          can_read: false, can_delete: false }
      })

      this.route.paramMap.subscribe((params: ParamMap) => {
        this.roleId = Number(params.get('id'))
        
        this.service.findRoleById(this.roleId).subscribe((response:any) => {
          this.role = response.data
          this.form.controls["role_name"].setValue(this.role.role_name)
          this.form.controls["can_access_web"].setValue(this.role.can_access_web)
          this.loading = false;
          this.updatePermission()
        })
      })
          this.loading = false;
    }, () => this.loading = false)
  }

  private updatePermission() {
    for (const rolePermission of this.role.permissions) {
      for (const permission of this.permissions) {
        if (permission.menu_id == rolePermission.menu.id) {
          permission.can_read = rolePermission.can_read
          permission.can_create = rolePermission.can_create
          permission.can_update = rolePermission.can_update
          permission.can_delete = rolePermission.can_delete
        }
      }
    }
  }

  submit() {
    this.loading = true

    if (this.form.invalid) {
      this.loading = false;
      return
    }

    const data = {
      role_name: this.form.controls['role_name'].value,
      can_access_web: this.form.controls['can_access_web'].value,
      permissions: this.permissions.map((permission: any) => {
        const _permission = { ...permission }
        delete _permission.menu_name
        return _permission
      })
    }

    this.service.updateRole(this.roleId, data).subscribe((response:any) => {
      this.router.navigate([this.baseUrl + '/role'])
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
      this._snackBar.open(message, '', { duration: 3000 });
    })
    
  }

}
