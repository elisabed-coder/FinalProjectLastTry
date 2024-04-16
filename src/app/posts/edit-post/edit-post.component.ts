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
import { postService } from 'src/app/Services/posts.service';
import { PostsComponent } from '../posts.component';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Output() postEdited: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedPost: Post | null = null;
  post!: Post;
  postId!: number;
  showError = false;
  editedPostData: any = {};
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
        this.selectedPost = foundPost; // Assign found post to selectedPost
      } else {
        console.error(`Post with ID ${this.postId} not found.`);
      }
    } else {
      console.error('ID parameter is null.');
    }
    console.log(this.selectedPost);
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  editPost(data: any) {
    if (this.selectedPost) {
      const changespost = {
        userId: this.selectedPost.userId,
        id: this.selectedPost.id,
        ...data.value,
      };
      // Save edited post data
      this.editedPostData = changespost;

      // Emit the edited post data
      this.postEdited.emit(changespost);

      console.log(changespost);
      this.goBack();
    }
  }
}
