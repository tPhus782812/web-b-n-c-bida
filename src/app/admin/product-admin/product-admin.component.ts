import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../entities/product';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule,NgxPaginationModule],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit { 
  products:any;
  p:number = 1;
constructor(private product: ProductService ) {
  this._listFilter = '';
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
  this.product.getDelete(id).subscribe(res => {
    this.product = res
    alert('xóa thành công với sản phẩm có số id'+ id)
}
)}

_listFilter: string;
get listFilter(): string {
return this._listFilter;
}
set listFilter(value: string) {
this._listFilter = value;
this.products = this.listFilter ?
this.performFilter(this.listFilter) : this.products;
}
performFilter(filterBy: string): IProduct[] {
filterBy = filterBy.toLocaleLowerCase();
return this.products.filter((product: IProduct) =>
product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
}


}
