import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Interfaces/posts.interface';
import { postService } from '../Services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  public users: User[] = [];
  public posts: Post[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public postservice: postService
  ) {}

  ngOnInit(): void {
    this.postservice.users$.subscribe((users) => {
      this.users = users;
    }),
      this.postservice.posts$.subscribe((posts) => {
        this.posts = posts;
      });
    this.postservice.getPostById;
  }
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateTask(data: Post) {
    this.postservice.CreateTask(data).subscribe(
      (response) => {
        console.log(response);

        // Fetch the user's name based on userId

        // Adjust IDs of existing posts
        const updatedPosts = this.posts.map((post) => ({
          ...post,
          id: post.id + 1,
        }));

        const newPost: Post = {
          userId: response.userId,
          id: 1,
          title: response.title,
          body: response.body,
          name: response.name,
        };

        // Update the posts array in the postService
        this.postservice.updatePosts([newPost, ...updatedPosts]);
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  getUserById(userId: number | undefined): string {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name || '' : '';
  }
  gotoEdit(post: Post) {
    console.log(post);
    this.router.navigate(['posts', post.id]);
  }
}
