import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CateService {

  constructor( private http: HttpClient) { }
  // các phương thức khác
  getList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/admin/cate');
  }
  getById(id:number):Observable<any>{
    return this.http.get<any>('http://localhost:3000/admin/cate/'+id);
  }
  create(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/admin/cate',data);
  }
  update(id:number,data:any):Observable<any>{
    return this.http.put<any>('http://localhost:3000/admin/cate/'+id,data);
  }
  getDelete(id:number):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/admin/cate/'+id);
  }
}
