import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { WorkService } from '../work/work.service';

@Component({
  selector: 'app-apply-work',
  templateUrl: './apply-work.component.html',
  styleUrls: ['./apply-work.component.scss']
})
export class ApplyWorkComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  applyWorks: Array<any> = [];
  displayedColumns = ['full_name','email','phone', 'depart_name_la', 'depart_name_en','position_name_la','position_name_en','file_name'];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private service: WorkService) {}

  ngOnInit(): void {
    // this.loadData();
  }

  ngAfterViewInit() {
    this.loadData();
    setInterval(() => {
      this.loadData();
    }, (1 * 60) * 5000);
  }

  loadData(){
    this.service.findAllApplyWork().subscribe((res:any) => {
      this.applyWorks = res.data;
      this.dataSource = new MatTableDataSource(this.applyWorks);
      this.dataSource.paginator = this.paginator;
    })
  }



  openFile(fileUrl:any) {
    window.open(fileUrl, '_blank');
  }

}
