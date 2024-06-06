import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users: any;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username && password) {
        this.loginService.login(username, password).subscribe({
          next: (res: any) => {
            console.log(res);
            
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            alert('Đăng nhập thành công');
            this.router.navigate(['/admin']);
          },
          error: (err) => {
            alert('Sai thư tến hoặc mật khách hãng');
          }
        });
      }
    }
  }
}