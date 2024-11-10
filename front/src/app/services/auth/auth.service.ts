import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import LoginRequest from 'src/app/models/LoginRequest';
import RegisterRequest from 'src/app/models/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  
  private isLogged = false;

  constructor(private http: HttpClient,) { }

  authenticate(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      loginRequest,
      { withCredentials: true }
    );
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      registerRequest,
      {withCredentials: true}
    )
  }

  login() {
    this.isLogged = true;
  }

  logout() {
    this.http.post(
      `${this.apiUrl}/logout`,
      { withCredentials: true }
    ).subscribe(() => {
      this.isLogged = false;
    })
  }

  getIsLogged() {
    return this.isLogged;
  }
}
