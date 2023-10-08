import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageDecoder',
})
export class ImageDecoderPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(article: Article): any {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:${article.image_media_type};base64,${article.image_data}`
    );
  }
}
