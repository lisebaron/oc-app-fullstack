import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = 'http://localhost:3001/api/topic';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(
      this.apiUrl,
      { withCredentials: true }
    )
  }
}
