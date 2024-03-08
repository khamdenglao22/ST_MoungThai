import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AboutStructureService } from '../about-structure.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-structure-list',
  templateUrl: './about-structure-list.component.html',
  styleUrls: ['./about-structure-list.component.scss'],
})
export class AboutStructureListComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  data: Array<any> = [];
  displayedColumns = [
    'image',
    'full_name_la',
    'full_name_en',
    'position_la',
    'position_en',
    'responsible_la',
    'responsible_en',
    'structure_order',
    'edit',
    'delete'
  ];
  loading = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private service: AboutStructureService) {}


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllAboutStructure().subscribe((res: any) => {
      this.dataSource = res.data;
      this.data = res.data;
      // console.log(res.data);
    });
  }

  deleteStructure(id:number | null){
    this.service.deleteAboutStructure(id).subscribe((res:any) => {
      // console.log(res)
      this.loadData()
    })
  }
}
