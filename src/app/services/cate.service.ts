import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CateService {

  constructor( private http: HttpClient) { }


  getAll(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
         'Authorization': 'Bearer ' + token 
        });
      return this.http.get<any>('http://localhost:3000/admin/cate', { headers: headers });
    } else {
      throw new Error('Token not found');
    }
  }

  // các phương thức khác
  getList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/cate');
  }
  getById(id:number):Observable<any>{
    return this.http.get<any>('http://localhost:3000/cate/'+id);
  }
  create(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/cate',data);
  }
  update(id:number,data:any):Observable<any>{
    return this.http.put<any>('http://localhost:3000/cate/'+id,data);
  }
  getDelete(id:number):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/cate/'+id);
  }
}
