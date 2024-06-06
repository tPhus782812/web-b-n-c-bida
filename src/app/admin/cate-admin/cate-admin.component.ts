import { Component, OnInit } from '@angular/core';
import { CateService } from '../../services/cate.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cate-admin',
  standalone: true,
  imports: [CommonModule,RouterLink],
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
delete(id:number){
  this.cate.getDelete(id).subscribe(res => {
    this.cate = res
    alert('Xóa thành công với loại có số id'+ id)
}
)}
}
