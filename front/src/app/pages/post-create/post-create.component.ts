import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import PostRequest from 'src/app/models/PostRequest';
import Topic from 'src/app/models/Topic';
import { PostService } from 'src/app/services/post/post.service';
import { TopicService } from 'src/app/services/topic/topic.service';

interface TopicId {
  name: string,
  id: number
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postForm!: FormGroup;
  topicIds: TopicId[] = [];

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private topicService: TopicService
  ) { 
    this.formInit();
  }

  ngOnInit(): void {
    this.buildTopicIds();
  }

  formInit(): void {
    this.postForm = this.fb.group({
      topicId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  buildTopicIds() {
    this.topicService.getAll().subscribe({
      next: (topics: Topic[]) => {
        topics.map((topic: Topic) => {
          this.topicIds.push({name: topic.name, id: topic.id})
        });
      },
      error: (error) => {
        console.error('Error while fetching topics: ', error);
      }
    })
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formData: PostRequest = this.postForm.value;
      this.postService.create(formData).subscribe({
        next: () => {
          console.log("created");
        },
        error: (error) => {
          console.error('post creation failed: ', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}