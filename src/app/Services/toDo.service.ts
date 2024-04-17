import { Injectable } from '@angular/core';
import { toDo } from '../Interfaces/todolist.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class toDoService {
  constructor(private http: HttpClient) {}

  getTodoList() {
    return this.http
      .get<toDo[]>('https://jsonplaceholder.typicode.com/todos')
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
