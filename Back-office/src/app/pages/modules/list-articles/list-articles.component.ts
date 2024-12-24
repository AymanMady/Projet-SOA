import { Article } from './../../../models/article';
import { Component , OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-list-articles',
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './list-articles.component.html',
  styleUrl: './list-articles.component.css'
})
export class ListArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    // Remplacez ceci par votre méthode pour récupérer les articles depuis l'API ou le service
    this.articleService.getAllarticles().subscribe(data => {
      this.articles = data;
    });
  }

  editArticle(article: Article) {
    this.router.navigate(['/home/edit-articles', article.id]);
  }

  deleteArticle(article: Article) {
    this.articleService.deletearticle(article.id).subscribe(() => {
      this.loadArticles();
    });
  }
}
