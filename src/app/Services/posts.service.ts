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

  updatePost(data: any) {
    return this.http.put<Observable<any>>(
      'https://jsonplaceholder.typicode.com/posts/',
      data
    );
  }
}
