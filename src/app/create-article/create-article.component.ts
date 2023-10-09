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
    formBuilder: FormBuilder,
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {
    this.articleForm = formBuilder.group({
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
    const article = this.newsService.getArticle(id);
    if (article != undefined) {
      // Todo
    }
  }

  saveArticle(article: Article) {
    console.log(article);
    // this.newsService.createArticle(article).subscribe({
    //   next: () => this.router.navigate(['/']),
    // });
  }
}
