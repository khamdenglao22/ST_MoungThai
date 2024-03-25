import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { SocialService } from '../social.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.scss']
})
export class SocialListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataNews: Array<any> = [];
  displayedColumns = [
    'image',
    'social_link',
    'social_position',
    'edit',
    'delete'
  ];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private service: SocialService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllSocial().subscribe((res: any) => {
      this.dataNews = res.data;
      this.dataSource = new MatTableDataSource(this.dataNews);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteSocial(id:number | null){
    this.service.deleteSocial(id).subscribe((res:any) => {
      alert(res.msg);
      this.loadData();
    })
  }
}
