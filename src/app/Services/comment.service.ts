import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commment } from '../Interfaces/comment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class commentService {
  constructor(private http: HttpClient) {}

  getComments(): Observable<commment[]> {
    return this.http.get<commment[]>(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );
  }

  addComment(comment: commment): Observable<commment> {
    return this.http.post<commment>(
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      comment
    );
  }
}
