import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../enums/category';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent {
  articleForm: FormGroup;
  categories: Category[];

  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private newsService: NewsService
  ) {
    this.articleForm = formBuilder.group({
      title: [''],
      category: [''],
      abstract: [''],
    });

    this.categories = Object.values(Category);
  }

  saveArticle(article: Article) {
    this.newsService.createArticle(article).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }
}
