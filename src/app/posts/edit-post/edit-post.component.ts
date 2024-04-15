import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/posts.interface';
import { postService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  post!: Post; // Default values ensure 'post' is never null
  postId!: number;
  showError = false; // Flag to show/hide error messages

  constructor(
    private postService: postService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.postId = +id;
      const foundPost = this.postService.posts.find(
        (post) => post.id === this.postId
      );

      if (foundPost) {
        this.post = foundPost;
      } else {
        console.error(`Post with ID ${this.postId} not found.`);
        // Handle the case where the post is not found, such as redirecting to a 404 page
        // this.router.navigate(['/404']);
      }
    } else {
      console.error('ID parameter is null.');
      // Handle the case where the ID parameter is null, such as redirecting to a 404 page
      // this.router.navigate(['/404']);
    }
  }
  goBack(): void {
    this.router.navigate(['/posts']);
  }
}
