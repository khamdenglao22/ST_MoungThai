import { Component, OnInit } from '@angular/core';
import { AboutStructureService } from '../about-structure.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-structure-create',
  templateUrl: './about-structure-create.component.html',
  styleUrls: ['./about-structure-create.component.scss'],
})
export class AboutStructureCreateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  image: any;
  loading = false;

  constructor(private service: AboutStructureService, private router: Router) {}

  form = new FormGroup({
    full_name_la: new FormControl('', [Validators.required]),
    full_name_en: new FormControl('', [Validators.required]),
    position_la: new FormControl('', [Validators.required]),
    position_en: new FormControl('', [Validators.required]),
    responsible_la: new FormControl(''),
    responsible_en: new FormControl(''),
    structure_order: new FormControl('', [Validators.required]),
  });

  // banner_position

  ngOnInit(): void {}

  onLogoChange(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    let formData = new FormData();
    formData.append('full_name_la', this.form.value.full_name_la);
    formData.append('full_name_en', this.form.value.full_name_en);
    formData.append('position_la', this.form.value.position_la);
    formData.append('position_en', this.form.value.position_en);
    formData.append('responsible_la', this.form.value.responsible_la);
    formData.append('responsible_en', this.form.value.responsible_en);
    formData.append('structure_order', this.form.value.structure_order);
    formData.append('image', this.image);

    this.service.createNewAboutStructure(formData).subscribe((res: any) => {
      this.router.navigate([this.baseUrl + '/about-structure']);
    });
  }
}
