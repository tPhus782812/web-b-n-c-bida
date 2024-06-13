import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CateAdminComponent } from './cate-admin/cate-admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { IProduct } from '../entities/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [DashboardComponent,RouterLink,RouterOutlet,ProductAdminComponent,CateAdminComponent,AddProductComponent,EditProductComponent, CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  
  products:IProduct[] = [];

  onBack(): void {
    // window.history.back();
    localStorage.removeItem('token',);
    localStorage.removeItem('role',);
    // Hoặc nếu bạn sử dụng sessionStorage
    // sessionStorage.removeItem('authToken');

    // Chuyển hướng người dùng về trang đăng nhập hoặc trang chủ
    window.location.href = "/login";
    // Thay '/login' bằng đường dẫn tới trang đăng nhập của bạn
  }
  constructor() {
    this._listFilter = '';
   }
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
