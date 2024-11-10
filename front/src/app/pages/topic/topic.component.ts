import { Component, OnInit } from '@angular/core';
import Topic from 'src/app/models/Topic';
import { TopicService } from 'src/app/services/topic/topic.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topics!: Topic[];

  constructor(private topicService: TopicService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(): void {
    this.topicService.getAll().subscribe({
      next: (topics: Topic[]) => {
        this.topics = topics;
      },
      error: (error) => {
        console.error('Error while fetching topics: ', error);
      }
    });
  }

  subscribe(topicId: number): void {
    this.userService.subscribe(topicId).subscribe({
      error: (error) => {
        console.error('Error while subscribing to a topic: ', error);
      }
    })
  }
}
