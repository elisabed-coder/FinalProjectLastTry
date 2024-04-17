import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFooterTemplateDirective } from '@ng-select/ng-select';
import { Post } from 'src/app/Interfaces/posts.interface';
import { PostsComponent } from '../posts.component';
import { postService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postservice: postService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      const postId = parseInt(routeId, 10);
      this.postservice.getPostById(postId).subscribe((post) => {
        this.post = post;
      });
    }
  }
  goBack(): void {
    this.router.navigate([`/posts`]);
  }
  saveChanges() {
    this.postservice.updatePost(this.post).subscribe((res) => {
      console.log('Post updated successfully', res);
    });

    this.goBack();
  }
}
