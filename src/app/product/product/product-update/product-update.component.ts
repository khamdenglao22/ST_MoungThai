import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product.service';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { ProductCategorySubService } from '../../product-category-sub/product-category-sub.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';
  loading = false;
  p_image: any;
  p_image_url: any;
  p_id: any;
  dataCate: any;
  dataSubCate: Array<any> = [];
  updateSectionList: Array<any> = [];
  deleteSectionId : Array<any> = [];

  constructor(
    private serviceCategory: ProductCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private service: ProductService,
    private serviceSubCategory: ProductCategorySubService
  ) {}

  productForm: FormGroup = new FormGroup({
    p_name_la: new FormControl(''),
    p_name_en: new FormControl(''),
    p_order: new FormControl(''),
    p_cate_id: new FormControl(''),
    p_cate_sub_id: new FormControl(''),
    seo_title: new FormControl('', [Validators.required]),
    seo_key_word: new FormControl('', [Validators.required]),
    seo_rewrite: new FormControl('', [Validators.required]),
    seo_description: new FormControl('', [Validators.required]),
    sectionList: new FormArray([]),
  });

  getSectionFields(): FormGroup {
    return new FormGroup({
      p_section_id: new FormControl(''),
      p_section_name_la: new FormControl(''),
      p_section_name_en: new FormControl(''),
      p_section_title_la: new FormControl(''),
      p_section_title_en: new FormControl(''),
      p_section_des: new FormControl(''),
      p_section_order: new FormControl(''),
      p_section_outline: new FormControl(null),
      p_section_image: new FormControl(''),
      p_section_image_url :new FormControl(''),
    });
  }

  sectionListArray() {
    return this.productForm.get('sectionList') as FormArray;
  }

  addSection() {
    this.sectionListArray().push(this.getSectionFields());
  }

  removeSection(i: number,formGroup: any) {
    this.sectionListArray().removeAt(i);
    // console.log("section_id = ",formGroup.controls['p_section_id'].value);
    this.deleteSectionId.push(formGroup.controls['p_section_id'].value)
    console.log("array id = ", this.deleteSectionId)
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

  ngOnInit(): void {
    this.serviceCategory.findAllCategory().subscribe((res: any) => {
      this.dataCate = res.data;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.p_id = Number(params.get('id'));
      this.service.findProductById(this.p_id).subscribe(
        (res: any) => {
          // console.log(res.data);
          this.p_image_url = res.data.p_image
          this.productForm.controls['p_name_la'].setValue(res.data.p_name_la);
          this.productForm.controls['p_name_en'].setValue(res.data.p_name_en);
          this.productForm.controls['p_order'].setValue(res.data.p_order);
          this.productForm.controls['p_cate_id'].setValue(res.data.p_cate_id);
          this.productForm.controls['seo_title'].setValue(res.data.seo_title);
          this.productForm.controls['seo_key_word'].setValue(res.data.seo_key_word);
          this.productForm.controls['seo_rewrite'].setValue(res.data.seo_rewrite);
          this.productForm.controls['seo_description'].setValue(res.data.seo_description);
          this.onCategorySubChange();
          this.productForm.controls['p_cate_sub_id'].setValue(
            res.data.p_cate_sub_id
          );

          for (let item of res.data.Sections) {
            let lists = new FormGroup({
              p_section_id: new FormControl(item.id),
              p_section_name_la: new FormControl(item.p_section_name_la),
              p_section_name_en: new FormControl(item.p_section_name_en),
              p_section_title_la: new FormControl(item.p_section_title_la),
              p_section_title_en: new FormControl(item.p_section_title_en),
              p_section_des: new FormControl(item.p_section_des),
              p_section_order: new FormControl(item.p_section_order),
              p_section_outline: new FormControl(item.p_section_outline),
              p_section_image: new FormControl(''),
              p_section_image_url: new FormControl(item.p_section_image),
            });
            this.sectionListArray().push(lists);
          }

          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
          const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
          this._snackBar.open(message, '', { duration: 3000 });
        }
      );
    });
  }

  getImageUrl(formGroup: any) {
    return formGroup.controls['p_section_image_url'].value;
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
    console.log(this.productForm.value);
    this.loading = true;

    if (this.productForm.invalid) {
      this.loading = false;
      return;
    }
    let formData = new FormData();
    formData.append('p_name_la', this.productForm.value.p_name_la);
    formData.append('p_name_en', this.productForm.value.p_name_en);
    formData.append('p_order', this.productForm.value.p_order);
    formData.append('p_outline', this.productForm.value.p_outline);
    formData.append('p_cate_id', this.productForm.value.p_cate_id);
    formData.append('p_cate_sub_id', this.productForm.value.p_cate_sub_id);
    formData.append('seo_title', this.productForm.value.seo_title);
    formData.append('seo_key_word', this.productForm.value.seo_key_word);
    formData.append('seo_rewrite', this.productForm.value.seo_rewrite);
    formData.append('seo_description', this.productForm.value.seo_description);
    // formData.append('sectionList', JSON.stringify(this.productForm.value.sectionList));

    let data: Array<any> = [];
    for (let i = 0; i < this.productForm.value.sectionList.length; i++) {
      const row = this.productForm.value.sectionList[i];
      formData.append(`p_section_image_${i}`, row.p_section_image);
      data.push({
        p_section_id: row.p_section_id,
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
    formData.append('deleteSectionId', JSON.stringify(this.deleteSectionId));
    formData.append('p_image', this.p_image);

    this.service.updateProduct(formData,this.p_id).subscribe((res: any) => {
      if(res.status == 200){
        this.router.navigate(['/product'])
      }else{
        alert('Error Create new Product')
      }
    });
  }
}
