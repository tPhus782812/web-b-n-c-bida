import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule],
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
}
