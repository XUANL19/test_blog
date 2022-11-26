import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activePath: string = '';
  activePage: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("?")) {
          this.activePath = 'query';
        } else {
          this.activePath = event.url.split('/')[1] || 'home';
        }
        this.activePage = this.activePath + '-page';
      }
    });
  }

}
