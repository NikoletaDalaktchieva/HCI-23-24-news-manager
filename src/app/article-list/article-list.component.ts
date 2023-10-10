import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';
import { LoginService } from '../services/login.service';
import { EventDispatcherService } from '../services/event-dispatcher.service';
import { Subscription } from 'rxjs';
import { AppEvent } from '../enums/event';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
    this.loadArtciles();
    this.filterInit();
  }

  loadArtciles() {
    this.subscriptions.add(
      this.eventDispatcher
        .getEvent(AppEvent.LogOut)
        ?.subscribe(() => this.updateArticles())
    );
  }

  delete(article: Article) {
    this.newsService.deleteArticle(article).subscribe({
      next: () => this.updateArticles(),
    });
  }

  private updateArticles() {
    this.newsService.getArticles().subscribe({
      next: (articles) => (this.articles = articles),
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Seatch filtering by title
  myControl = new FormControl<string | Article>('');
  filteredOptions?: Observable<Article[]>;

  filterInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const title = typeof value === 'string' ? value : value?.title;
        return title ? this._filter(title as string) : this.articles.slice();
      })
    );
  }

  displayFn(article: Article): string {
    return article && article.title ? article.title : '';
  }

  private _filter(title: string): Article[] {
    const filterValue = title.toLowerCase();

    return this.articles.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
