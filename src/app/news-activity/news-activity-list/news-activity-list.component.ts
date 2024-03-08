import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsActivityService } from '../news-activity.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-news-activity-list',
  templateUrl: './news-activity-list.component.html',
  styleUrls: ['./news-activity-list.component.scss']
})
export class NewsActivityListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataNews: Array<any> = [];
  displayedColumns = [
    'image',
    'title_la',
    'title_en',
    'to_date',
    'end_date',
    'active',
    'gallery',
    'edit',
  ];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private service: NewsActivityService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllNews().subscribe((res: any) => {
      this.dataNews = res.dataAll;
      // console.log(res.dataAll)
      this.dataSource = new MatTableDataSource(this.dataNews);
      this.dataSource.paginator = this.paginator;
    });
  }


  updateNews(news: any) {
    const data = {
      active: !news.active,
    };

    this.service.updateNewsActive(news.id, data).subscribe(
      (response: any) => {
        this.loadData();
      },

    );
  }

}
