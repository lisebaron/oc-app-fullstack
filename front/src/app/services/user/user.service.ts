import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/user';
  
  constructor(private http: HttpClient) { }

  subscribe(topicId: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/subscribe/${topicId}`, {}, {withCredentials: true}
    );
  }

  unsubscribe(topicId: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/unsubscribe/${topicId}`, {}, {withCredentials: true}
    );
  }
}
