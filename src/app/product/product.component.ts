import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit { 
    products:any;
  constructor(private product: ProductService ) {
    console.log(product);
    console.log("chào ní")
   }
  ngOnInit(): void {
      this.product.getAll().subscribe(res => {
        console.log(res);
        this.products = res;
      })
  }
}
