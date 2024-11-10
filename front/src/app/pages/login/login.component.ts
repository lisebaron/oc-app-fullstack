import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import LoginRequest from 'src/app/models/LoginRequest';
import { Router } from '@angular/router';

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
        next: (response) => {
          this.authService.login();
          this.goTo("/topics");
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
