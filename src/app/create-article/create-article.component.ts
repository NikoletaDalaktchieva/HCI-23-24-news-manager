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
  imageName = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.formBuilder.group({
      id: [null],
      title: [''],
      subtitle: [''],
      category: [''],
      abstract: [''],
      body: [''],
      image_data: [null],
      image_media_type: [null],
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
          image_data: [null],
          image_media_type: [null],
        });
      },
    });
  }

  saveArticle(article: Article) {
    (article.id
      ? this.newsService.updateArticle(article)
      : this.newsService.createArticle(article)
    ).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }

  onImageUploaded(event: any) {
    const file: File = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const result = fileReader.result?.toString();
      this.articleForm.controls['image_data'].setValue(
        result?.substring(result.indexOf(',') + 1)
      );
    };
    fileReader.readAsDataURL(file);

    this.articleForm.controls['image_media_type'].setValue(file.type);
    this.imageName = file.name;
  }
}
