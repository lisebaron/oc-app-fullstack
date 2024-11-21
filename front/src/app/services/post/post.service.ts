import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PostRequest from 'src/app/models/PostRequest';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3001/api/post';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(
      this.apiUrl,
      { withCredentials: true }
    );
  }

  getPost(postId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${postId}`,
      { withCredentials: true }
    );
  }

  create(postRequest: PostRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}`,
      postRequest,
      { withCredentials: true }
    );
  }
}
