import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Comment from 'src/app/models/Comment';
import CommentRequest from 'src/app/models/CommentRequest';
import Post from 'src/app/models/Post';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post!: Post;
  commentForm!: FormGroup;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private postService: PostService,
    private commentService: CommentService,
  ) {
    this.formInit();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getPost(params["id"]);
    });
  }

  formInit(): void {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  getPost(postId: number) {
    this.postService.getPost(postId).subscribe({
      next: (post: Post) => {
        this.post = post;
      },
      error: (error) => {
        console.error('Error while fetching post details: ', error);
      }
    });
  }

  createComment() {
    if (this.commentForm.valid) {
      const formData: CommentRequest = this.commentForm.value;
      this.commentService.create(this.post.id,formData).subscribe({
        next: (comment: Comment) => {
          this.post.comments.push(comment);
        },
        error: (error) => {
          console.error('Error while creating comment: ', error);
        }
      });
    }
  }
}
