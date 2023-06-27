import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { PointTypeService } from '../point-type.service';

@Component({
  selector: 'app-point-type-list',
  templateUrl: './point-type-list.component.html',
  styleUrls: ['./point-type-list.component.scss'],
})
export class PointTypeListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  pointType: Array<any> = [];
  displayedColumns = [
    'pointMethod',
    'pointTypeDesc',
    'pointPercent',
    'edit',
    'delete'
  ];


  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private service: PointTypeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.service.findPointType().subscribe((res: any) => {
      // console.log(res);
      this.pointType = res;
      this.dataSource = new MatTableDataSource(this.pointType);
      this.loading = false;
    });
  }

  deletePointType(id:any){
    this.loading = true;
    this.service.deletePointType(id).subscribe((res:any) => {
      this.loading = false;
      this.loadData()
      alert("Delete Successfully...!")
    })
  }
}
