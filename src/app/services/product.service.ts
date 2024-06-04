import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor( private http: HttpClient) { }
  // các phương thức khác
  getList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/admin/product');
  }
  getById(id:number):Observable<any>{
    return this.http.get<any>('http://localhost:3000/admin/product/'+id);
  }
  create(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/admin/product',data);
  }
  update(id:number,data:any):Observable<any>{
    return this.http.put<any>('http://localhost:3000/admin/product/'+id,data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/admin/product/'+id);
  }
 
}
