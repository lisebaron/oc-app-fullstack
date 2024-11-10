import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post!: Post;

  constructor(private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getPost(params["id"]);
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
    })
  }

}
