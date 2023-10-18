import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';
import { LoginService } from '../services/login.service';
import { EventDispatcherService } from '../services/event-dispatcher.service';
import { Subscription } from 'rxjs';
import { AppEvent } from '../enums/event';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteArticleComponent } from '../delete-article/delete-article.component';
import { Category } from '../enums/category';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  chipSelected: boolean = false;
  articles: Article[] = [];
  selectedCategory: Category | 'All' = 'All';
  categories: Category[];
  searchControl = new FormControl<string>('');

  private subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private loginService: LoginService,
    private eventDispatcher: EventDispatcherService,
    private dialog: MatDialog
  ) {
    this.loggedIn = this.loginService.isLoggedIn();
    this.updateArticles();
    this.categories = Object.values(Category);
  }

  ngOnInit() {
    this.loadArtciles();
    // this.filterInit();
  }

  loadArtciles() {
    this.subscriptions.add(
      this.eventDispatcher
        .getEvent(AppEvent.LogOut)
        ?.subscribe(() => this.updateArticles())
    );

    this.subscriptions.add(
      this.eventDispatcher
        .getEvent(AppEvent.ArticleDeleted)
        ?.subscribe(() => this.updateArticles())
    );
  }

  delete(article: Article) {
    const dialogRef = this.dialog.open(DeleteArticleComponent, {
      data: article,
    });
  }

  private updateArticles() {
    this.newsService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loggedIn = this.loginService.isLoggedIn();
      },
    });
  }

  // // Seatch filtering by title
  // filteredOptions?: Observable<Article[]>;

  // filterInit() {
  //   this.filteredOptions = this.myControl.valueChanges.pipe(
  //     startWith(''),
  //     map((value) => {
  //       const title = typeof value === 'string' ? value : value?.title;
  //       return title ? this._filter(title as string) : this.articles.slice();
  //     })
  //   );
  // }
  // private _filter(title: string): Article[] {
  //   const filterValue = title.toLowerCase();

  //   return this.articles.filter((option) =>
  //     option.title.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  // }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
