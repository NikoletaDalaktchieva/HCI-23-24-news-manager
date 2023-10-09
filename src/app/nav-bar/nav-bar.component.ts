import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { EventDispatcherService } from '../services/event-dispatcher.service';
import { AppEvent } from '../enums/event';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  search = '';
  isLogged = false;
  username = '';

  private subscribtions = new Subscription();

  constructor(
    private loginService: LoginService,
    private newsService: NewsService,
    private eventDispatcherService: EventDispatcherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventDispatcherService.getEvent(AppEvent.LogIn)?.subscribe((user) => {
      this.isLogged = true;

      this.newsService.setUserApiKey(user.apikey);
      this.username = user.username;
    });

    this.eventDispatcherService.getEvent(AppEvent.LogOut)?.subscribe(() => {
      this.isLogged = false;

      this.newsService.setAnonymousApiKey();
      this.username = '';

      this.router.navigate(['/']);
    });
  }

  logout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }
}
