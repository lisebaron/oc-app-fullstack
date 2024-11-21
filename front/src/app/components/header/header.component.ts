import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleDrawer = new EventEmitter<void>();
  currentRoute: string = '';

  constructor(private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  onToggleDrawer(): void {
    this.toggleDrawer.emit();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
