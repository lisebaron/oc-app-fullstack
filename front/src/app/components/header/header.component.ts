import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isEnabled: boolean = true;

  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
