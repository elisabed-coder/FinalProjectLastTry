import { Component, OnInit } from '@angular/core';
import { postService } from '../Services/posts.service';
import { User } from '../Interfaces/user.interface';
import { Post } from '../Interfaces/posts.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  latestPostId: number = 1;

  showCreateTaskForm: boolean = false;

  constructor(private postService: postService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getUsers().subscribe((user) => {
      this.users = user;
    });

    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.postService.posts = this.posts;
    });
  }

  getUserById(userId: number): string {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.name || '' : '';
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateTask(data: Post) {
    this.postService.CreateTask(data).subscribe(
      (response) => {
        console.log(response);

        // Update users array with the user data from response
        this.users = [
          {
            id: response.userId,
            name: response.name,
          },
          ...this.users,
        ];
        console.log(this.users);

        // Fetch the user's name based on userId
        const userName = this.getUserById(response.userId);

        // Adjust IDs of existing posts
        this.posts.forEach((post) => {
          post.id++; // Decrease ID by 1 for each existing post
        });

        // Construct the new post object
        const newPost: Post = {
          userId: response.userId,
          id: 1, // Use the ID 1 for the new post
          title: response.title,
          body: response.body,
          name: userName, // Use the fetched user's name
        };

        // Add the new post at the beginning of the posts array
        this.posts.unshift(newPost);
        console.log(newPost);
      },

      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  editPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }
}
