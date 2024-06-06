import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit { 
  products:any;
constructor(private product: ProductService ) {
  console.log(product);
  console.log("chào ní")
 }
ngOnInit(): void {
    this.product.getList().subscribe(res => {
      console.log(res);
      this.products = res;
    })
}
delete(id:number){
  this.product.getDeleteProduct(id).subscribe(res => {
    this.product = res
    alert('xóa thành công với sản phẩm có số id'+ id)
}
)}

}
