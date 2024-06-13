import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  getList(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
         'Authorization': 'Bearer ' + token 
        });
      return this.http.get<any>('http://localhost:3000/admin/product', { headers: headers });
    } else {
      throw new Error('Token not found');
    }
  }
  getById(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:3000/admin/product/' + id);
  }
  updateProduct(id: number, data: IProduct): Observable<any> {
    return this.http.put<any>('http://localhost:3000/admin/product/' + id, data);
  }
  getDeleteProduct(id: number): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/admin/product/' + id);
  }

  postAddProduct(data: IProduct): Observable<any> {
    return this.http.post<any>('http://localhost:3000/admin/product/', data);
  }

  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product_new/5');
  }
  getProduct_id(id:number):Observable<any>{
    return this.http.get<any>('http://localhost:3000/product/'+id);
  }
  update(id:number,data:any):Observable<any>{
    return this.http.put<any>('http://localhost:3000/product/'+id,data);
  }
  getDelete(id:number):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/product/'+id);
  }
  create(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/product',data);
  }
  getAddtoCart(){
    let cartJson = sessionStorage.getItem('cart');
    if(cartJson){
      return JSON.parse(cartJson);
    }else{
      return [];
    }
  }
}
