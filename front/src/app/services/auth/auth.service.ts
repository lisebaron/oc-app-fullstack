import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import LoginRequest from 'src/app/models/LoginRequest';
import RegisterRequest from 'src/app/models/RegisterRequest';
import userInfosRequest from 'src/app/models/UserInfosRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  
  constructor(private http: HttpClient,
    private router: Router,
  ) { }

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
      { withCredentials: true }
    );
  }

  login(username: string) {
    localStorage.setItem("username", username);
  }

  logout() {
    this.http.post(
      `${this.apiUrl}/logout`,
      { withCredentials: true }
    ).subscribe(() => {
      this.router.navigate(['']);
      localStorage.removeItem("username");
    });
  }

  getUserInfos(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/me`,
      { withCredentials: true }
    );
  }

  updateUserInfos(userInfosRequest: userInfosRequest): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/me`,
      userInfosRequest,
      { withCredentials: true }
    );
  }
}
