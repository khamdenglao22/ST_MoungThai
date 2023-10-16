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
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.service.createRole(this.form.value).subscribe(
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
