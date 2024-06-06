import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent  implements OnInit {
  productForm!: FormGroup
  product: any;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = + this.route.snapshot.params['id']
    this.productService.getById(id).subscribe(res => {
      this.product = res
      console.log(this.product)
    });
    this.productForm = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'id_cate': new FormControl(null, Validators.required ),
      'name': new FormControl('', [Validators.required, Validators.minLength(1)]),
      "price": new FormControl(),
      "price_sale": new FormControl(),
      "image": new FormControl(),
      // "date": new FormControl(null),
      // "hidden": new FormControl(null),
    })
  }


  onSubmit() {
    let id = + this.route.snapshot.params['id']
    const { id_cate, name, price, price_sale, image, date, hidden } = this.productForm.value
    const data = {
      id,
      id_cate,
      name, 
      price, 
      price_sale, 
      image, 
      date, 
      hidden
    }
    this.productService.updateProduct(id, data).subscribe(res => {
      this.productService = res
      alert('sua thanh cong voi san pham co so id: ' + id)
    })
  }
  addImageUrl() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.productForm.get('listImg')).push(control);
  }
  // addProduct(data:FormGroup []){
  //     this.productService.postAddProduct(this.productForm.value).subscribe();
  // }
}
