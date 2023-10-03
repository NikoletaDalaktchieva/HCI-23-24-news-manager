import { Category } from "../enums/category";

export interface Article {
    id: number;
    tittle: string;
    subtitle?: string;
    category: Category;
    abstract: string;
    body?: string;
    update_date?: Date;
    // image_data; 
    // image_media_type;
    // thumbnail_data; 
    // thumbnail_media_type;
}
