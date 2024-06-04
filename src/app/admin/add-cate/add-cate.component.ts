import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CateService } from '../../services/cate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-cate',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-cate.component.html',
  styleUrl: './add-cate.component.css'
})
export class AddCateComponent implements OnInit {
  cateForm!: FormGroup
  constructor(private cateservice: CateService) { }
  
  ngOnInit(): void {
    this.cateForm=new FormGroup({
      'id': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      


  })
}
onSubmit(){
    console.log(this.cateForm.value);
    this.cateservice.create(this.cateForm.value).subscribe();
    alert("Thêm thành công "+this.cateForm.value.name)
    }
    addImageUrl() {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.cateForm.get('listImg')).push(control);
    }
  // addProduct(data:FormGroup []){
  //     this.productService.postAddProduct(this.productForm.value).subscribe();
  // }

}
