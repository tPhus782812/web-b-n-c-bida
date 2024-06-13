import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CateComponent } from '../cate/cate.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductComponent } from '../product/product.component';
import { CartComponent } from '../cart/cart.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CateComponent,RouterLink,RouterOutlet,HeaderComponent,FooterComponent,ProductComponent,CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
 
  }
