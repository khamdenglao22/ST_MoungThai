import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : ''
  loading = false
  image: any
  imageError = false
  settings: Array<any> = []

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private service: SettingService
  ) { }

  ngOnInit(): void {
    this.service.findAllSetting().subscribe((res: any) => {
      this.settings = res;
    })
  }

  submit() {
    this.loading = true

    for (const setting of this.settings) {
      if (setting.value == "") {
        const message = `ກະລຸນາໃສ່ຂໍ້ມູນ ${setting.description}`
        this._snackBar.open(message, '', { duration: 3000 });
        this.loading = false
        return 
      }
    }

    this.service.updateSetting({ settings: this.settings }).subscribe((response:any) => {
        this._snackBar.open('ບັນທຶກຂໍ້ມູນສຳເລັດ', '', { duration: 3000 });
        this.loading = false
      }, (err:any) => {
        this.loading = false;
        const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
        this._snackBar.open(message, '', { duration: 3000 });
      });
    }

}
