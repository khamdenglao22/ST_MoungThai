import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NewsActivityService } from '../news-activity.service';

@Component({
  selector: 'app-news-activity-gallery',
  templateUrl: './news-activity-gallery.component.html',
  styleUrls: ['./news-activity-gallery.component.scss'],
})
export class NewsActivityGalleryComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  dataNewsGallery: Array<any> = [];
  displayedColumns = ['image', 'delete'];
  loading = false;

  news_id:any;



  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private route: ActivatedRoute,private service : NewsActivityService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.news_id = Number(params.get('id'));
      this.loadData();
    });
  }

  loadData(){
    this.service.findGalleryByNewsId(this.news_id).subscribe((res:any) => {
      this.dataNewsGallery = res.data
      this.dataSource = new MatTableDataSource(this.dataNewsGallery);
    })
  }

  deleteGallery(gallery_id:number | null){
    this.service.deleteGallery(gallery_id).subscribe((res:any) => {
      this.loadData()
    })
  }
}
