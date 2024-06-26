import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  map,
  throwError,
} from 'rxjs';
import { User } from '../Interfaces/user.interface';
import { Post } from '../Interfaces/posts.interface';

@Injectable({
  providedIn: 'root',
})
export class postService {
  public postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    []
  );
  public posts$: Observable<Post[]> = this.postsSubject.asObservable();

  public usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  public users$: Observable<User[]> = this.usersSubject.asObservable();

  public users: User[] = [];
  public posts: Post[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getUsers().subscribe((users) => this.updateUsers(users));
    this.getPosts().subscribe((posts) => this.updatePosts(posts));
  }

  updatePosts(posts: Post[]): void {
    this.postsSubject.next(posts);
  }

  updateUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  getUsers() {
    return this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(catchError(this.handleError));
  }
  getPosts(): Observable<Post[]> {
    return forkJoin({
      posts: this.http.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts'
      ),
      users: this.getUsers(),
    }).pipe(
      map(({ posts, users }) => {
        // Map posts array to include user names
        return posts.map((post) => ({
          ...post,
          name: users.find((user) => user.id === post.userId)?.name,
        }));
      })
    );
  }

  getUserById(userId: number | undefined): string {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name || '' : '';
  }

  getPostById(postId: number | undefined): Observable<Post | undefined> {
    return this.posts$.pipe(
      map((posts) => posts.find((post) => post.id === postId))
    );
  }

  CreateTask(data: any) {
    return this.http
      .post<any>('https://jsonplaceholder.typicode.com/posts', data)
      .pipe(catchError(this.handleError));
  }

  updatePost(updatedPost: Post | undefined): Observable<Post | undefined> {
    if (!updatedPost || updatedPost.id === undefined) {
      return throwError('Invalid post or post ID');
    }

    const url = `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`;
    return this.http
      .put<Post>(url, updatedPost)
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
