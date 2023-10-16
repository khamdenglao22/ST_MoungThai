import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { WorkService } from '../work.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-work-create',
  templateUrl: './work-create.component.html',
  styleUrls: ['./work-create.component.scss'],
})
export class WorkCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  provinces:any;
  loading = false;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private service: WorkService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private appService: AppService
  ) {}

  form = new FormGroup({
    position_name_la: new FormControl('', [Validators.required]),
    position_name_en: new FormControl('', [Validators.required]),
    depart_name_la: new FormControl('', [Validators.required]),
    depart_name_en: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    prov_cd:new FormControl('', [Validators.required]),
  });
  

  ngOnInit(): void {
    this.loadProvince();
  }


  loadProvince() {
    this.appService.findAllProvince().subscribe((res: any) => {
      this.provinces = res.data;
    });
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.service.createWork(this.form.value).subscribe(
      (response: any) => {
        this.router.navigate([this.baseUrl + '/work']);
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
