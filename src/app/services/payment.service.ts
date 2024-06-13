import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any) {
    // Gửi dữ liệu thanh toán đến backend hoặc xử lý dữ liệu ở đây
    console.log(paymentData);
    // Ví dụ gửi dữ liệu đến một endpoint API
    return this.http.post('http://localhost:3000/bill', paymentData);
  }
}
