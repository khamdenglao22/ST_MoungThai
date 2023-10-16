import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  dynamicFormGroup!: FormGroup;
  output!: any;
  constructor(private formBuilder: FormBuilder) {}

  // dynamicFormGroup1 = new FormGroup({
  //   streetAddress: new FormControl('', [Validators.required]),
  //   city: new FormControl('', [Validators.required]),
  //   state: new FormControl('', [Validators.required]),
  // });

  ngOnInit() {
    this.dynamicFormGroup = this.formBuilder.group({
      address: new FormArray([this.createItem]),
    });
  }

  addNewAddress(): void {
    (this.dynamicFormGroup.get('address') as FormArray).push(this.createItem);
  }

  get formControllers() {
    return this.dynamicFormGroup.controls;
  }

  get AddressInfo() {
    return this.formControllers['address'] as FormArray;
  }

  get createItem(): FormGroup {
    return this.formBuilder.group({
      streetAddress: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.output = this.dynamicFormGroup.controls['address'].value;
    console.log(this.output);
  }
}
