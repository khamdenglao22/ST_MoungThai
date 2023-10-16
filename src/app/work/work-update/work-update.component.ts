import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { WorkService } from '../work.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-work-update',
  templateUrl: './work-update.component.html',
  styleUrls: ['./work-update.component.scss'],
})
export class WorkUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  work_id: number | null;
  provinces:any;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private service: WorkService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.work_id = Number(params.get('id'));
      this.service.findWorkById(this.work_id).subscribe(
        (response: any) => {
          this.form.controls['position_name_la'].setValue(
            response.data.position_name_la
          );
          this.form.controls['position_name_en'].setValue(
            response.data.position_name_en
          );

          this.form.controls['depart_name_la'].setValue(
            response.data.depart_name_la
          );
          this.form.controls['depart_name_en'].setValue(
            response.data.depart_name_en
          );

          this.form.controls['amount'].setValue(
            response.data.amount
          );

          if(response.data.prov_cd != null){
            this.form.controls['prov_cd'].setValue(
              response.data.prov_cd
            );
          }
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
          const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
          this._snackBar.open(message, '', { duration: 3000 });
        }
      );
    });

    this.loadProvince();
  }

  loadProvince() {
    this.appService.findAllProvince().subscribe((res: any) => {
      this.provinces = res.data;
    });
  }

  submit() {
    this.service.updateWork(this.form.value, this.work_id).subscribe(
      (res: any) => {
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
