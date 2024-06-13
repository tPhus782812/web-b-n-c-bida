import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { CateService } from '../services/cate.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent  implements OnInit  {
  
  product: any;
  cate: any;
  cart: any = this.detail.getAddtoCart();
  constructor(private detail: ProductService, private route: ActivatedRoute, private cateService: CateService, private router: Router) {
    console.log("chào ní")
   }
  ngOnInit(): void {
    console.log(this.cart);
    let id = + this.route.snapshot.params['id']
    this.detail.getProduct_id(id).subscribe(res => {
      this.product = res
    console.log(this.product);
    this.cateService.getById(this.product.id_cate).subscribe(res => {
      this.cate = res;
      console.log(res);
    })
    
    });
  }
  addtocart(product: any) {
    let index = this.cart.findIndex((item:any) =>{
      return item.id == product.id
    });
    if (index >=0){
      this.cart[index].quantity += 1; 
      this.cart[index].subtotal = this.cart[index].price * this.cart[index].quantity;
    } else {
      let cartItem:any = {
        id: product.id,
        name: product.name,
        price: product.price ? product.price : product.price,
        image: product.image,
        quantity: 1,
        subtotal: product.price
      }
    
    this.cart.push(cartItem);
    console.log(this.cart);
    
    }
    Swal.fire({
      title: 'Bạn có muốn thêm vào giỏ hàng',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: 'warning',  
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có'
    }).then((result) => { let cartJson = JSON.stringify(this.cart);
      sessionStorage.setItem('cart', cartJson);
        // Chuyển hướng đến trang giỏ hàng sau khi hiển thị thông báo thành công
        this.router.navigate(['/cart']);
    });
    

  }
  }


