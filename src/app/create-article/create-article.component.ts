import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
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
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {
    this.articleForm = formBuilder.group({
      id: [null],
      title: [''],
      subtitle: [''],
      category: [''],
      abstract: [''],
      body: [''],
    });

    this.categories = Object.values(Category);
  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getArticle(id).subscribe({
      next: (article) => {
        this.articleForm.setValue({
          id: article.id,
          title: article.title,
          subtitle: article.subtitle,
          category: article.category,
          abstract: article.abstract,
          body: article.body,
        });
      },
    });
  }

  saveArticle(article: Article) {
    console.log(article);

    (article.id
      ? this.newsService.updateArticle(article)
      : this.newsService.createArticle(article)
    ).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }
}
