import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NewsActivityService } from '../../news-activity.service';

@Component({
  selector: 'app-news-activity-gallery-create',
  templateUrl: './news-activity-gallery-create.component.html',
  styleUrls: ['./news-activity-gallery-create.component.scss'],
})
export class NewsActivityGalleryCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  loading = false;
  image: any;
  news_id: any;

  constructor(
    private route: ActivatedRoute,
    private service: NewsActivityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.news_id = Number(params.get('id'));
    });
  }
  onLogoChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    let formData = new FormData();
    formData.append('news_id',this.news_id);
    formData.append('image', this.image);
    this.service.createGallery(formData).subscribe((res:any) => {
      this.router.navigate(['/news-activity/gallery',this.news_id])
    })
  }
}
