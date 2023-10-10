import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';
import { Category } from '../enums/category';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(articles: Article[], category?: Category): Article[] {
    2;
    if (category == undefined || category.toString() == 'All') {
      return articles;
    }
    return articles.filter((article) => article.category === category);
  }
}
