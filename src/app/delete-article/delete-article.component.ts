import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { EventDispatcherService } from '../services/event-dispatcher.service';
import { AppEvent } from '../enums/event';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.css'],
})
export class DeleteArticleComponent {
  constructor(
    private newsService: NewsService,
    private snackBar: MatSnackBar,
    private eventDispatcherService: EventDispatcherService,
    public dialogRef: MatDialogRef<DeleteArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article
  ) {}

  onConfirm() {
    this.newsService.deleteArticle(this.article).subscribe({
      next: () => {
        this.eventDispatcherService.dispatch(AppEvent.ArticleDeleted);
        this.snackBar.open(`Article deleted: ${this.article.title}`, '', {
          duration: 3000,
        });
        this.close();
      },
    });
  }

  public close() {
    this.dialogRef.close();
  }
}
