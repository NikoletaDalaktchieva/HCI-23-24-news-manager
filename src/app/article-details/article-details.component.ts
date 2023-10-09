import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  article?: Article;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.getArtcile();
  }

  getArtcile(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.newsService.getArticle(id).subscribe({
      next: (article) => (this.article = article),
      error: () => {
        console.log('An error occurred!');
      },
    });
  }
}
