import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerId: any
  customer: any
  loading = true;

  constructor(
    private service: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.customerId = Number(params.get('id'));
      this.service.findCustomerById(this.customerId).subscribe((response:any) => {
        this.customer = response.data;
        if (this.customer.firstname) {
          let prefix = this.customer.gender == "m" ? "ທ້າວ. " : "ນາງ. ";
          this.customer.firstname = `${prefix}${this.customer.firstname} ${this.customer.lastname}`;
        } else {
          this.customer.firstname = "---";
        }

        if (!this.customer.email) {
          this.customer.email = "---";
        }
        this.loading = false;
      })
    });
  }

}
