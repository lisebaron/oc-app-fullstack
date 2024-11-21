import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CommentRequest from 'src/app/models/CommentRequest';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3001/api/comment';

  constructor(private http: HttpClient) { }

  create(postId: number, commentRequest: CommentRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${postId}`,
      commentRequest,
      { withCredentials: true }
    );
  }
}
