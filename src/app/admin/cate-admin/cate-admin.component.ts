import { Component, OnInit } from '@angular/core';
import { CateService } from '../../services/cate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cate-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cate-admin.component.html',
  styleUrl: './cate-admin.component.css'
})
export class CateAdminComponent implements OnInit {
  cates:any;
constructor(private cate: CateService ) {
  console.log(cate);
 }
ngOnInit(): void {
    this.cate.getList().subscribe(res => {
      // console.log(res);
      this.cates = res;
    })
}
}
