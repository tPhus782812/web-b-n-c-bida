import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { CateService } from '../services/cate.service';

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
  constructor(private detail: ProductService, private route: ActivatedRoute, private cateService: CateService) {
    console.log("chào ní")
   }
  ngOnInit(): void {
    let id = + this.route.snapshot.params['id']
    this.detail.getById(id).subscribe(res => {
      this.product = res
    console.log(this.product);
    this.cateService.getById(this.product.id_cate).subscribe(res => {
      this.cate = res;
      console.log(res);
    })
    
    });
  }


}

