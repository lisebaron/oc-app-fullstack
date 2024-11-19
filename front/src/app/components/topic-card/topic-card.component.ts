import { Component, Input, OnInit } from '@angular/core';
import Topic from 'src/app/models/Topic';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent implements OnInit {
  @Input() topic!: Topic;
  @Input() isSub: boolean = false;
  
  constructor(private userService: UserService ) { }
  
  ngOnInit(): void { }
  
  subscribe(topicId: number): void {
    this.userService.subscribe(topicId).subscribe({
      next: () => {
        this.isSub = !this.isSub;
      },
      error: (error) => {
        console.error('Error while subscribing to a topic: ', error);
      }
    })
  }

  unsubscribe(topicId: number): void {
    this.userService.unsubscribe(topicId).subscribe({
      next: () => {
        this.isSub = !this.isSub;
      },
      error: (error) => {
        console.error('Error while unsubscribing to a topic: ', error);
      }
    })
  }
}
