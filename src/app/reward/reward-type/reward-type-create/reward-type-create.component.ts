import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RewardService } from '../../reward.service';


@Component({
  selector: 'app-reward-type-create',
  templateUrl: './reward-type-create.component.html',
  styleUrls: ['./reward-type-create.component.scss']
})
export class RewardTypeCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;

  constructor(private service: RewardService,private router: Router) { }


  form = new FormGroup({
    rewardMethod: new FormControl('', [Validators.required]),
    rewardTypeDesc: new FormControl('', [Validators.required]),
    rewardPercent: new FormControl('', [Validators.required]),
    startRange: new FormControl('', [Validators.required]),
    endRange: new FormControl('', [Validators.required]),
    CompanyId: new FormControl(1),
  });


  ngOnInit(): void {
  }

  submit(){

    this.loading = true;
    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    let RewardPercent = this.form.value.rewardPercent.toString().replace('.',',')
    // console.log(RewardPercent)
    this.service.createRewardType({
      rewardMethod:this.form.value.rewardMethod,
      rewardTypeDesc:this.form.value.rewardTypeDesc,
      rewardPercent:RewardPercent,
      startRange:this.form.value.startRange,
      endRange:this.form.value.endRange,
      CompanyId:this.form.value.CompanyId,
    }).subscribe((res:any) => {
      this.router.navigate([this.baseUrl + '/reward-type']);
      this.loading = false;
    })
  }

}
