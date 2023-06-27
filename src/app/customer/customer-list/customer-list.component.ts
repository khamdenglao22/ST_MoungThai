import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Customer, CustomerService } from '../customer.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  displayedColumns = [
    'image',
    'name',
    'phone',
    'email',
    'created_dt',
    'detail',
    'active',
  ];
  loading = false;
  searchPhone: String = '';
  limit = 50;
  resultsLength = 0;
  data: Customer[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private service: CustomerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadData();
  }

  searchCustomer() {
    this.loadData();
  }

  private loadData() {
    this.paginator!!.pageIndex = 0;

    merge(this.paginator!!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.service
            .findAllCustomer({
              offset: this.paginator!!.pageIndex + 1,
              limit: this.limit,
              phone: this.searchPhone,
            })
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          console.log(data);

          this.loading = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalCustomer;
          const customers = data.results.map((customer) => {
            if (customer.firstname) {
              let prefix = '';
              if (customer.gender == 'm') {
                prefix = 'ທ້າວ. ';
              } else if (customer.gender == 'f') {
                prefix = 'ນາງ. ';
              }
              customer.firstname = `${prefix}${customer.firstname} ${customer.lastname}`;
            } else {
              customer.firstname = '---';
            }

            if (!customer.email) {
              customer.email = '---';
            }
            return customer;
          });
          return customers;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  updateCustomer(customer: Customer) {
    customer.active = !customer.active;
    this.service
      .updateCustomer(customer.id, { active: customer.active })
      .subscribe(
        (response: any) => {},
        (err: any) => {
          const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
          this._snackBar.open(message, '', { duration: 3000 });
        }
      );
  }
}
