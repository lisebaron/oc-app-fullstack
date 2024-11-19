import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts!: Post[];
  isSortByMostRecent : boolean = true;

  constructor(private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed(): void {
    this.postService.getAll().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        this.posts.map(post => ({
          ...post,
          createdAt: new Date(post.createdAt)
        }));
      },
      error: (error) => {
        console.error('Error while fetching posts: ', error);
      }
    });
  }

  sort() {
    this.posts = this.posts.reverse();
    this.isSortByMostRecent = !this.isSortByMostRecent;
  }

  goToCreatePost() {
    this.router.navigate(["post-create"]);
  }
}
