import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent {
  public articles: Article[] = [];
  constructor(private newsService: NewsService) {
    newsService
      .getArticles()
      .subscribe({ next: (articles) => (this.articles = articles) });
  }

  remove(id: number | undefined) {}
}
