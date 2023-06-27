import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface saledetail {
  ticket_id:string
  order_date:string
  lot_id:number
  draw_date:string
  Paid_by:string
  total_amount:number
  Name:string
  phone:string
  SaleDetails : details[];
}
export class details{
  ticket_id :string
  order_date: string
  lot_id : number
  mluckynumber : number
  mamount: number
}

@Component({
  selector: 'app-sale-details-parent',
  templateUrl: './sale-details-parent.component.html',
  styleUrls: ['./sale-details-parent.component.scss']
})
export class SaleDetailsParentComponent implements OnInit {

  action:string;
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<SaleDetailsParentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA)
     public data: details) {
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
