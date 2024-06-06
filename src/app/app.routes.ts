import { RouterModule, Routes } from '@angular/router';
import { CateComponent } from './cate/cate.component';
import { HomeComponent } from './home/home.component';
import { NgModel } from '@angular/forms';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { CateAdminComponent } from './admin/cate-admin/cate-admin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddCateComponent } from './admin/add-cate/add-cate.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { EditCateComponent } from './admin/edit-cate/edit-cate.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './login.guard';

export const routes: Routes = [
   
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: ProductComponent },
            { path: 'products', component: ProductComponent },
            { path: 'products/:id', component: ProductdetailComponent },
            { path: 'cate', component: CateComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate : [loginGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'product-admin', component: ProductAdminComponent },    
            { path: 'product-admin/:id', component: EditProductComponent },
            { path: 'cate-admin', component: CateAdminComponent },
            { path: 'cate-admin/:id', component: EditCateComponent },
            { path: 'add-product', component: AddProductComponent },
            { path: 'add-cate', component: AddCateComponent },




        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }



];