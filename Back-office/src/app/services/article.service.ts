import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8081/articles';

  constructor(private http: HttpClient) { }


  getAllarticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl, {
      responseType: 'json'
    });
  }

  getarticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`, {
      responseType: 'json'
    });
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  updatearticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article, {
      responseType: 'json'
    });
  }

  deletearticle(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      responseType: 'json'
    });
  }
}
