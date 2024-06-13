import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm!: FormGroup;

  constructor(private PaymentService: PaymentService) { }
  
  ngOnInit(): void {
    this.paymentForm=new FormGroup({
      'id': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'id_user': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'date': new FormControl('', [Validators.required, Validators.minLength(3)]),
      "customer": new FormControl('', [Validators.required, Validators.minLength(1)]),
      "phone": new FormControl('', [Validators.required, Validators.minLength(1)]),
      "address": new FormControl('', [Validators.required, Validators.minLength(1)]),
  })
}
onSubmit(){
    console.log(this.paymentForm.value);
    this.PaymentService.processPayment(this.paymentForm.value).subscribe();
    alert("Thanh toán thành công"+this.paymentForm.value.name)
    }
}
