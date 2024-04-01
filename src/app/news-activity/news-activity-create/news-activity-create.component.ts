import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsActivityService } from '../news-activity.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-news-activity-create',
  templateUrl: './news-activity-create.component.html',
  styleUrls: ['./news-activity-create.component.scss']
})
export class NewsActivityCreateComponent implements OnInit {

  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  loading = false;
  image :any;
  news_video :any;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private service: NewsActivityService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}


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
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
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
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  form = new FormGroup({
    title_la: new FormControl('', [Validators.required]),
    title_en: new FormControl('', [Validators.required]),
    description_la: new FormControl('', [Validators.required]),
    description_en: new FormControl('', [Validators.required]),
    to_date: new FormControl(null),
    end_date: new FormControl(null),
    seo_title: new FormControl('', [Validators.required]),
    seo_key_word: new FormControl('', [Validators.required]),
    seo_rewrite: new FormControl('', [Validators.required]),
    seo_description: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onLogoChange(event: any) {
    this.image = event.target.files[0];
  }

  onVideoChange(event:any){
    this.news_video = event.target.files[0];
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    let formData = new FormData();
    formData.append('title_la', this.form.value.title_la);
    formData.append('title_en', this.form.value.title_en);
    formData.append('description_la', this.form.value.description_la);
    formData.append('description_en', this.form.value.description_en);
    formData.append('to_date', this.form.value.to_date);
    formData.append('end_date', this.form.value.end_date);
    formData.append('image', this.image);
    formData.append('news_video', this.news_video);
    formData.append('seo_title', this.form.value.seo_title);
    formData.append('seo_key_word', this.form.value.seo_key_word);
    formData.append('seo_rewrite', this.form.value.seo_rewrite);
    formData.append('seo_description', this.form.value.seo_description);

    this.service.createNews(formData).subscribe(
      (response: any) => {
        this.router.navigate([this.baseUrl + '/news-activity']);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        const message = err.msg || 'ເກີດຂໍ້ຜິດພາດບາງຍ່າງ';
        this._snackBar.open(message, '', { duration: 3000 });
      }
    );
  }

}
