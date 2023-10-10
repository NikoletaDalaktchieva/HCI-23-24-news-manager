import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'searchFilter',
  pure: false,
})
export class SearchFilterPipe implements PipeTransform {
  transform(article: Article[], filterText: string): Article[] {
    return article.filter((article) =>
      article.title.toLowerCase()?.includes(filterText.toLowerCase())
    );
  }
}
