import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';
import { LoginService } from '../services/login.service';
import { EventDispatcherService } from '../services/event-dispatcher.service';
import { Subscription } from 'rxjs';
import { AppEvent } from '../enums/event';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  public loggedIn: boolean;
  public articles: Article[] = [];

  private subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private loginService: LoginService,
    private eventDispatcher: EventDispatcherService
  ) {
    this.loggedIn = this.loginService.isLoggedIn();
    this.updateArticles();
  }

  ngOnInit() {
    this.subscriptions.add(
      this.eventDispatcher
        .getEvent(AppEvent.LogOut)
        ?.subscribe(() => this.updateArticles())
    );
  }

  private updateArticles() {
    this.newsService.getArticles().subscribe({
      next: (articles) => (this.articles = articles),
    });
  }

  remove(id: number | undefined) {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
