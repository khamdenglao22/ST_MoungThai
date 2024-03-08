import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AboutStructureService } from '../about-structure.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-structure-update',
  templateUrl: './about-structure-update.component.html',
  styleUrls: ['./about-structure-update.component.scss']
})
export class AboutStructureUpdateComponent implements OnInit {
  baseUrl = environment.baseUrl != '' ? '/' + environment.baseUrl : '';

  image: any;
  loading = false;
  imageUrl:any;
  banner_Id: number | null

  constructor(
    private service: AboutStructureService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  form = new FormGroup({
    full_name_la: new FormControl('', [Validators.required]),
    full_name_en: new FormControl('', [Validators.required]),
    position_la: new FormControl('', [Validators.required]),
    position_en: new FormControl('', [Validators.required]),
    responsible_la: new FormControl(''),
    responsible_en: new FormControl(''),
    structure_order: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.banner_Id = Number(params.get('id'))
      this.service.findAllAboutStructureById(this.banner_Id).subscribe((response: any) => {
        this.imageUrl = response.data.image
        this.form.controls['full_name_la'].setValue(response.data.full_name_la);
        this.form.controls['full_name_en'].setValue(response.data.full_name_en);
        this.form.controls['position_la'].setValue(response.data.position_la);
        this.form.controls['position_en'].setValue(response.data.position_en);
        this.form.controls['responsible_la'].setValue(response.data.responsible_la);
        this.form.controls['responsible_en'].setValue(response.data.responsible_en);
        this.form.controls['structure_order'].setValue(response.data.structure_order);
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
        const message = err.msg || "ເກີດຂໍ້ຜິດພາດບາງຍ່າງ"
        this._snackBar.open(message, '', { duration: 3000 });
      })
    })
  }

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
    this.service.updateBAboutStructure(formData,this.banner_Id).subscribe((res:any) =>{
      this.router.navigate([ this.baseUrl + "/about-structure"])
    })
  }

}
