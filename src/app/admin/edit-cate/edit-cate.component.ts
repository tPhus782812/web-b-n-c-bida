import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CateService } from '../../services/cate.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-cate',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-cate.component.html',
  styleUrl: './edit-cate.component.css'
})
export class EditCateComponent implements OnInit {
  cateFrom!: FormGroup
  cate: any;
  constructor(private cateservice: CateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = + this.route.snapshot.params['id']
    this.cateservice.getById(id).subscribe(res => {
      this.cate = res
      console.log(this.cate)
    });
    this.cateFrom = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'name': new FormControl('', [Validators.required, Validators.minLength(1)])
      // "date": new FormControl(null),
      // "hidden": new FormControl(null),
    })
  }


  onSubmit() {
    let id = + this.route.snapshot.params['id']
    const {name } = this.cateFrom.value
    const data = {
      id,
      name, 
      
    }
    this.cateservice.update(id, data  ).subscribe(res => {
      this.cateservice = res
      alert('sua thanh cong voi san pham co so id: ' + id)
    })

}
}