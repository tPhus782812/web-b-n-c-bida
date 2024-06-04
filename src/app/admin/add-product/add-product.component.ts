import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.productForm=new FormGroup({
      'id': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'id_cate': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      "price": new FormControl('', [Validators.required, Validators.minLength(1)]),
      "price_sale": new FormControl('', [Validators.required, Validators.minLength(1)]),
      "image": new FormControl(''),
      "date": new FormControl(null),
      "hidden": new FormControl(null),
      


  })
}
onSubmit(){
    console.log(this.productForm.value);
    this.productService.create(this.productForm.value).subscribe();
    alert("Thêm sản phẩm thành công"+this.productForm.value.name)
    }
    addImageUrl() {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.productForm.get('listImg')).push(control);
    }
  // addProduct(data:FormGroup []){
  //     this.productService.postAddProduct(this.productForm.value).subscribe();
  // }
}
