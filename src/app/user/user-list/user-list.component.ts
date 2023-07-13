import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  users: Array<any> = [];
  displayedColumns = [
    'fullname',
    'username',
    'role',
    'active',
    'change_password',
    'edit',
  ];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private service: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
        this.loadData();
  }

  private loadData() {
    this.loading = true;
    this.service.findAllUser().subscribe(
      (response: any) => {
        console.log("data",response.data)
        this.users = response.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  updateUser(user: any) {
    const data = {
      fullname: user.fullname,
      username: user.username,
      role_id: user.role ? user.role.id : null,
      active: !user.active,
    };

    this.service.updateUser(user.id, data).subscribe(
      (response: any) => {},
      (err: any) => {
        const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
        this._snackBar.open(message, '', { duration: 3000 });
      }
    );
  }
}
