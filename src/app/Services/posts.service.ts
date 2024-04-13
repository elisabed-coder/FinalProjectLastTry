import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../Interfaces/user.interface';
import { Post } from '../Interfaces/posts.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class postService {
  private _posts: Post[] = [];
  posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  // Getter for posts array
  get posts(): Post[] {
    return this._posts;
  }

  set posts(posts: Post[]) {
    this._posts = posts;
    this.posts$.next(posts); // Emit new value when posts array is updated
  }

  constructor(private http: HttpClient) {}

  //    getu usernames from server
  getUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  //    getu usernames from server
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(
      'https://jsonplaceholder.typicode.com/users/' + userId
    );
  }

  CreateTask(data: any) {
    return this.http.post<any>(
      'https://jsonplaceholder.typicode.com/posts',
      data
    );
  }

  // getPostById(id: number): Observable<Post> {
  //   const foundPost = this.posts.find((p) => p.id === id);
  //   if (foundPost) {
  //     return of(foundPost); // Return the found post from the local array
  //   } else {
  //     return this.http
  //       .get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  //       .pipe(
  //         catchError((error: HttpErrorResponse) => {
  //           if (error.status === 404) {
  //             // Handle not found error here, maybe return a default post or throw an error
  //             return throwError('Post not found');
  //           } else {
  //             // Handle other errors
  //             return throwError('Error fetching post');
  //           }
  //         })
  //       );
  //   }
  // }
}
