import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { details } from '../../lottery.service';

export interface datawindetails{
  ticket_id:string;
  order_date:string;
  lot_id:number;
  draw_date:string;
  paid_by:string;
  total_amount:number;
  win_amount:number;
  name:string;
  phone:string;
  winDetails: wintdetails[];
  }
export class wintdetails{
  lot_id: number;
  ticket_id: string ="";
  mluckynumber: string=""
  mamount: number;
  winamt: number;
}

@Component({
  selector: 'app-win-details-parent',
  templateUrl: './win-details-parent.component.html',
  styleUrls: ['./win-details-parent.component.scss']
})
export class WinDetailsParentComponent implements OnInit {
 action:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<WinDetailsParentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA)
     public data: wintdetails) {
    this.local_data = {...data};
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
}
