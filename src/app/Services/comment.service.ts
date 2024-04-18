import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commment } from '../Interfaces/comment.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class commentService {
  constructor(private http: HttpClient) {}

  getComments(): Observable<commment[]> {
    return this.http
      .get<commment[]>('https://jsonplaceholder.typicode.com/posts/1/comments')
      .pipe(catchError(this.handleError));
  }

  addComment(comment: commment): Observable<commment> {
    return this.http
      .post<commment>(
        'https://jsonplaceholder.typicode.com/posts/1/comments',
        comment
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A clint-side or network error occurred. Handle it accordingly
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
