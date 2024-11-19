import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import LoginRequest from 'src/app/models/LoginRequest';
import { Router } from '@angular/router';
import UsernameResponse from 'src/app/models/UsernameResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      this.formInit();
    }

  ngOnInit(): void {
  }

  formInit(): void {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData: LoginRequest = this.loginForm.value;
      this.authService.authenticate(loginData).subscribe({
        next: (res: UsernameResponse) => {
          this.authService.login(res.username);
          this.goTo("/feed");
        },
        error: (error) => {
          console.error('Login failed: ', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
