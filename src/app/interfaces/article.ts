import { Category } from '../enums/category';

export interface Article {
  id?: number;
  title: string;
  subtitle?: string;
  category: Category;
  abstract: string;
  body?: string;
  username?: string;
  update_date?: Date;
  image_data?: string;
  image_media_type?: string;
  thumbnail_image?: string;
  thumbnail_media_type?: string;
}
