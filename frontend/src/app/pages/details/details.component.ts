import { Article } from './../../models/article';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  isLoading = false;
  articleId: number = 0;

  article: Article = {
    title: '',
    categorie: '',
    content: '',
    createdAt: '',
    image: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.articleId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadArticle();
  }

  loadArticle() {
    this.isLoading = true; 
    this.cdr.detectChanges(); 

    this.articleService.getarticleById(this.articleId).subscribe(
      (article) => {
        this.article = {
          title: article.title,
          categorie: article.categorie,
          content: article.content,
          createdAt: article.createdAt,
          image: `data:image/jpeg;base64,${article.image}`,
        };
        this.isLoading = false; 
        this.cdr.detectChanges(); 
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'article :', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }
}
