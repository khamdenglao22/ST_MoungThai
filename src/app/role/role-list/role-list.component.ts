import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  roles: Array<any> = [];
  displayedColumns = ['role_name', 'edit'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  deleteRole(roleId: number) {
    if (confirm('ທ່ານໝັ້ນໃຈບໍ່ວ່າຕ້ອງການລົບຂໍ້ມູນ?')) {
      this.service.deleteRole(roleId).subscribe((response: any) => {
        this.loadData();
      });
    }
  }

  private loadData() {
    this.loading = true;
    this.service.findAllRole().subscribe(
      (response: any) => {
        this.roles = response.data;
        this.dataSource = new MatTableDataSource(this.roles);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }
}
