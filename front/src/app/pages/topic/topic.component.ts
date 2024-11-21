import { Component, OnInit } from '@angular/core';
import Topic from 'src/app/models/Topic';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TopicService } from 'src/app/services/topic/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topics!: Topic[];
  user!: User;

  constructor(private topicService: TopicService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getTopics();
    this.getUserInfos();
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

  getUserInfos() {
    this.authService.getUserInfos().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error while fetching user infos: ', error);
      }
    });
  }

  checkUserIsSub(topicId: number): boolean {
    let isSub = false;
    this.user.topics.forEach((topic: Topic) => {
      if (topic.id === topicId) {
        isSub = true;
      }
    });
    return isSub;
  }
}
