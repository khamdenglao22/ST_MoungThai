import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RewardService } from '../../reward.service';

@Component({
  selector: 'app-reward-type-update',
  templateUrl: './reward-type-update.component.html',
  styleUrls: ['./reward-type-update.component.scss']
})
export class RewardTypeUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  rewardType: Array<any> = [];
  rewardTypeId: number | null = null;

  constructor(
    private service: RewardService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar

    ) { }


  form = new FormGroup({
    rewardMethod: new FormControl('', [Validators.required]),
    rewardTypeDesc: new FormControl('', [Validators.required]),
    rewardPercent: new FormControl('', [Validators.required]),
    startRange: new FormControl('', [Validators.required]),
    endRange: new FormControl('', [Validators.required]),
    CompanyId: new FormControl(1),
  });


  ngOnInit(): void {

    this.service.findRewardType().subscribe((response: any) => {
      this.rewardType = response.data;
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.rewardTypeId = Number(params.get('id'));
        this.service.findRewardTypeById(this.rewardTypeId).subscribe(
          (response: any) => {
            // console.log(response)
            this.form.controls["rewardMethod"].setValue(response.rewardMethod)
            this.form.controls["rewardTypeDesc"].setValue(response.rewardTypeDesc)
            this.form.controls["rewardPercent"].setValue(response.rewardPercent)
            this.form.controls["startRange"].setValue(response.startRange)
            this.form.controls["endRange"].setValue(response.endRange)
            this.loading = false;
          },
          (err: any) => {
            this.loading = false;
            const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
            this._snackBar.open(message, '', { duration: 3000 });
          }
        );
      });
    });
  }

  submit() {
    // console.log(this.form.value)
    let RewardPercent = this.form.value.rewardPercent.toString().replace('.',',')

    this.service.updateRewardType(
      this.rewardTypeId,
       {
        rewardTypeId:this.rewardTypeId,
        rewardMethod:this.form.value.rewardMethod,
        rewardTypeDesc:this.form.value.rewardTypeDesc,
        rewardPercent:RewardPercent,
        startRange:this.form.value.startRange,
        endRange:this.form.value.endRange,
        CompanyId:this.form.value.CompanyId,
      }).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + '/reward-type'])
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
      this._snackBar.open(message, '', { duration: 3000 });
    })
  }

}
