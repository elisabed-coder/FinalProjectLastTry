import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { commment } from 'src/app/Interfaces/comment.interface';
import { commentService } from 'src/app/Services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  allComments: commment[] = [];
  newCommentName: string = '';
  newCommentBody: string = '';

  constructor(private commentService: commentService) {}

  ngOnInit(): void {
    this.commentService.getComments().subscribe((comments) => {
      this.allComments = comments;
      localStorage.setItem('comments', JSON.stringify(this.allComments));
    });
  }

  addNewComment(form: NgForm) {
    const newComment: commment = {
      id: this.allComments.length + 1,
      name: this.newCommentName,
      body: this.newCommentBody,
    };

    this.commentService.addComment(newComment).subscribe((response) => {
      console.log(response);
      this.allComments = [...this.allComments, response];
      localStorage.setItem('comments', JSON.stringify(this.allComments));
      form.reset();
    });
  }
}
