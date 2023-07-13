import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RewardService } from '../../reward.service';

@Component({
  selector: 'app-reward-type-list',
  templateUrl: './reward-type-list.component.html',
  styleUrls: ['./reward-type-list.component.scss']
})
export class RewardTypeListComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  rewardType: Array<any> = [];
  displayedColumns = [
    'rewardMethod',
    'rewardTypeDesc',
    'rewardPercent',
    'startRange',
    'endRange',
    'edit',
    'delete'
  ];
  loading = false
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  rewardAge: any;
  user: any;

  constructor(
    private service: RewardService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.loadData();

    try {
      const decoded = this.authService.decodeToken() as any;
      if (decoded) {
          this.user = {
            user_id: decoded.user_id,
            fullname: decoded.fullname,
            role_id: decoded.role_id,
        }
      }
    } catch (err) {
    }
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  loadData(){
    this.loading = true;
    this.service.findRewardType().subscribe((res:any) => {
      this.rewardType = res
      // console.log(res)
      this.dataSource = new MatTableDataSource(this.rewardType);
      this.loading = false;
    });

    this.service.getRewardAge().subscribe((response: any) => {
      this.rewardAge = response;

    });
  }

  deletePointType(id:any){
    this.service.deleteRewardType(id).subscribe((res:any) => {
      this.loadData()
      alert("Delete Successfully...!")
    })
  }

  updateRewardAge() {
    const data = {
      RewardAgeId: 1,
      Age: this.rewardAge.age,
      CompanyId: 1,
      EditedAt: new Date(),
      EditedBy: this.user.user_id
    };

    this.service.updateRewardAge(data).subscribe((response: any) => {
      this._snackBar.open('ສຳເລັດ', '', { duration: 3000 });
    }, (err: any) => {
      const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
      this._snackBar.open(message, '', { duration: 3000 });
    });

    console.log(data);
  }

}
