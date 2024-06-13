import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../entities/product';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,PaymentComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  
  cart: CartItem[] = [];
  item: any ;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  constructor(private detail: ProductService, private Router: Router) {
   }
   ngOnInit(): void {
    
    this.cart = this.detail.getAddtoCart();
    this.updateTotals();
 }
 subtotal(cart: any) {
  return cart.quantity * cart.price;
}
increaseQuantity(productId: number) {
  let index = this.cart.findIndex(item => item.id === productId);
  if (index !== -1) {
      this.cart[index].quantity += 1;
      // Cập nhật subtotal dựa trên số lượng mới
      this.cart[index].subtotal = this.cart[index].quantity * this.cart[index].price;
  }
  // Cập nhật sessionStorage
  this.updateCartSession();
}

decreaseQuantity(productId: number) {
  let index = this.cart.findIndex(item => item.id === productId);
  if (index !== -1 && this.cart[index].quantity > 0) { // Đảm bảo số lượng không giảm xuống dưới 1

      this.cart[index].quantity -= 1;
      // Cập nhật subtotal dựa trên số lượng mới
      this.cart[index].subtotal = this.cart[index].quantity * this.cart[index].price;
  }
  // Cập nhật sessionStorage
  this.updateCartSession();
}

updateCartSession() {
  let cartJson = JSON.stringify(this.cart);
  sessionStorage.setItem('cart', cartJson);
}

removeFromCart(productId: number) {
  Swal.fire({
    title: 'Bạn có muốn xóa sản phẩm nà?y',
    text: "Bạn sẽ không thể hoàn tác hành động này!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Có'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Đã xóa thành công',
        'Sản phẩm đã được xóa khỏi giỏ hàng',
      )

      let index = this.cart.findIndex(item => item.id === productId);
      if (index !== -1) {
          this.cart.splice(index, 1);
      }
      // Cập nhật sessionStorage
      
      this.updateCartSession();
    }
  });
}

clearCart() {
  Swal.fire({
    title: 'Bạn có muốn xóa giỏ hàng ?',
    text: "Bạn sẽ không thể hoàn tác hành động này!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Có'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Đã xóa thành công',
        'Sản phẩm đã được xóa khỏi giỏ hàng',
        
      )
  this.cart = [];
  this.updateCartSession();

    }
  });

}

updateTotals(): void {
  this.totalQuantity = this.cart.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
goToPaymentPage(): void {
  this.Router.navigate(['/payment']);
}

}
