import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../enums/category';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent {
  articleForm: FormGroup;
  categories: Category[];
  imageName = '';
  isUpdate = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.articleForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      subtitle: [''],
      category: ['', Validators.required],
      abstract: ['', Validators.required],
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
          image_data: article.image_data,
          image_media_type: article.image_media_type,
        });
        this.imageName = article.image_data ? 'Uploaded image' : '';
        this.isUpdate = true;
      },
    });
  }

  saveArticle(article: Article) {
    (article.id
      ? this.newsService.updateArticle(article)
      : this.newsService.createArticle(article)
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.snackBar.open(
          `Article ${this.isUpdate ? 'updated' : 'created'}: ${article.title}`,
          '',
          {
            duration: 3000,
          }
        );
      },
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
