import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import RegisterRequest from 'src/app/models/RegisterRequest';
import UsernameResponse from 'src/app/models/UsernameResponse';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formInit();
  }

  ngOnInit(): void {
  }

  formInit() {
    let regex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$');
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email,Validators.required]],
      password: ['', [Validators.required, Validators.pattern(regex)]],
    })
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const registerData: RegisterRequest = this.registerForm.value;
      this.authService.register(registerData).subscribe({
        next: (res: UsernameResponse) => {
          this.authService.login(res.username);
          this.goTo("/feed");
        },
        error: (error) => {
          console.error('Register failed: ', error);
          
        }
      })
    } else {
      console.error('Form is invalid');
    }
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
