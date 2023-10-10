import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageDecoder',
})
export class ImageDecoderPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(article: Article, isThumbnail: boolean = false): any {
    const type = isThumbnail
      ? article.thumbnail_media_type
      : article.image_media_type;
    const data = isThumbnail ? article.thumbnail_image : article.image_data;

    return this.sanitizer.bypassSecurityTrustUrl(`data:${type};base64,${data}`);
  }
}
