import { Category } from '../enums/category';

export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  category: Category;
  abstract: string;
  body?: string;
  update_date?: Date;
  image_data?: string;
  image_media_type?: string;
  thumbnail_data?: string;
  thumbnail_media_type?: string;
}
