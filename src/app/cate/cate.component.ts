import { Component, OnInit } from '@angular/core';
import { CateService } from '../services/cate.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-cate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cate.component.html',
  styleUrl: './cate.component.css'
})
export class CateComponent implements OnInit {
  cates:any;
  cart : any = [];
constructor(private cate: CateService,private detail: ProductService) {
  console.log(cate);
 }
ngOnInit(): void {
    this.cate.getList().subscribe(res => {
      // console.log(res);
      this.cates = res;
    })
}
}
