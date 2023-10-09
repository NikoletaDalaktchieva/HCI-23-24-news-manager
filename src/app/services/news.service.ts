import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { envConfig } from 'src/app/environment/config';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private rootUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news';
  private articleListUrl = `${this.rootUrl}/articles`;
  private articleUrl = `${this.rootUrl}/article`;

  private apiKey?: string;

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'PUIRESTAUTH apikey=' + envConfig.apiKey,
    }),
  };

  public setUserApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'PUIRESTAUTH apikey=' + this.apiKey,
      }),
    };
  }

  public setAnonymousApiKey() {
    this.setUserApiKey(envConfig.apiKey);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articleListUrl, this.httpOptions);
  }

  deleteArticle(article: Article | number): Observable<Article> {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articleUrl}/${id}`;
    return this.http.delete<Article>(url, this.httpOptions);
  }

  getArticle(id: number): Observable<Article> {
    console.log('Requesting article id=' + id);
    const url = `${this.articleUrl}/${id}`;
    return this.http.get<Article>(url, this.httpOptions);
  }

  updateArticle(article: Article): Observable<Article> {
    console.log('Updating article id=' + article.id);
    return this.http.post<Article>(this.articleUrl, article, this.httpOptions);
  }

  createArticle(article: Article): Observable<Article> {
    console.log('Creating article');
    console.log(article);
    return this.http.post<Article>(this.articleUrl, article, this.httpOptions);
  }
}
