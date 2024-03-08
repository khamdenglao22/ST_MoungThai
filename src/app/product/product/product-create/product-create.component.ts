import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductCategorySubService } from '../../product-category-sub/product-category-sub.service';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  p_image: any;
  dataCate: any;
  dataSubCate: Array<any> = [];

  constructor(
    private serviceCategory: ProductCategoryService,
    private serviceSubCategory: ProductCategorySubService,
    private service: ProductService,
    private router : Router
  ) {}

  productForm: FormGroup = new FormGroup({
    p_name_la: new FormControl(''),
    p_name_en: new FormControl(''),
    p_order: new FormControl(''),
    p_cate_id: new FormControl(''),
    p_cate_sub_id: new FormControl(''),
    // sectionList: new FormArray([this.getSectionFields()]),
    sectionList: new FormArray([]),
  });

  getSectionFields(): FormGroup {
    return new FormGroup({
      p_section_name_la: new FormControl(''),
      p_section_name_en: new FormControl(''),
      p_section_title_la: new FormControl(''),
      p_section_title_en: new FormControl(''),
      p_section_des: new FormControl(''),
      p_section_order: new FormControl(''),
      p_section_outline: new FormControl(null),
      p_section_image: new FormControl(''),
    });
  }

  sectionListArray() {
    return this.productForm.get('sectionList') as FormArray;
  }

  addSection() {
    this.sectionListArray().push(this.getSectionFields());
  }

  removeSection(i: number) {
    this.sectionListArray().removeAt(i);
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: '',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { dfsdf }
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  ngOnInit() {
    this.serviceCategory.findAllCategory().subscribe((res: any) => {
      this.dataCate = res.data;
    });
  }

  onCategorySubChange() {
    this.dataSubCate = [];
    const p_cate_id = this.productForm.get('p_cate_id')?.value;
    this.serviceSubCategory
      .findAllSubCategoryOnChange(p_cate_id)
      .subscribe((res: any) => {
        this.dataSubCate = res.data;
        // console.log(res.data)
      });
  }

  onChangeProductImage(event: any) {
    this.p_image = event.target.files[0];
  }

  onImageChange(event: any, i: any) {
    if (this.sectionListArray().at(i).get('p_section_image') != null) {
      this.sectionListArray()
        .at(i)
        .get('p_section_image')
        ?.setValue(event.target.files[0]);
    }
  }

  submit() {
    console.log("data ====" ,this.productForm.value);
    console.log(this.p_image);

    let formData = new FormData();
    formData.append('p_name_la', this.productForm.value.p_name_la);
    formData.append('p_name_en', this.productForm.value.p_name_en);
    formData.append('p_order', this.productForm.value.p_order);
    formData.append('p_outline', this.productForm.value.p_outline);
    formData.append('p_cate_id', this.productForm.value.p_cate_id);
    formData.append('p_cate_sub_id', this.productForm.value.p_cate_sub_id);
    // formData.append('sectionList', JSON.stringify(this.productForm.value.sectionList));

    let data: Array<any> = [];
    for (let i = 0; i < this.productForm.value.sectionList.length; i++) {
      const row = this.productForm.value.sectionList[i];
      formData.append(`p_section_image_${i}`, row.p_section_image);
      data.push({
        p_section_name_la: row.p_section_name_la,
        p_section_name_en: row.p_section_name_en,
        p_section_title_la: row.p_section_title_la,
        p_section_title_en: row.p_section_title_en,
        p_section_des: row.p_section_des,
        p_section_order: row.p_section_order,
        p_section_outline: row.p_section_outline,
        // p_section_image: row.p_section_image
      });
    };
    formData.append('sectionList', JSON.stringify(data));
    formData.append('p_image', this.p_image);

    this.service.createProduct(formData).subscribe((res: any) => {
      if(res.status == 200){
        this.router.navigate(['/product'])
      }else{
        alert('Error Create new Product')
      }
    });
  }
}
