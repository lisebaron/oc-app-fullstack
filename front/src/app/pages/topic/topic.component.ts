import { Component, OnInit } from '@angular/core';
import Topic from 'src/app/models/Topic';
import { TopicService } from 'src/app/services/topic/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topics!: Topic[];

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(): void {
    this.topicService.getAll().subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
      },
      (error) => {
        console.error('error while fetching topics: ', error);
      }
    )
  }
}
