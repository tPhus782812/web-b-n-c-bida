import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component'
import { HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component'
import { CateComponent } from './cate/cate.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,HomeComponent,FooterComponent,CateComponent,ProductdetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ASM';
}
