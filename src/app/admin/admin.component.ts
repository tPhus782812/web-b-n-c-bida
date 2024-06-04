import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CateAdminComponent } from './cate-admin/cate-admin.component';
import { AddProductComponent } from './add-product/add-product.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [DashboardComponent,RouterLink,RouterOutlet,ProductAdminComponent,CateAdminComponent,AddProductComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

}
