import { Component } from '@angular/core';
import { Abonnee } from '../../../models/abonnee';
import { Router } from '@angular/router';
import { AbonneeService } from '../../../services/abonnee.service';
import { CommonModule } from '@angular/common';
import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    abonnees: Abonnee[] = [];
    articles: Article[] = [];

    nbr_articles : number = 0
    nbr_abonnees : number = 0

    constructor(private articleService: ArticleService,private abonneeService: AbonneeService, private router: Router) { }

    ngOnInit(): void {
      this.loadabonnees();
    }

    loadabonnees() {
      this.abonneeService.getAllabonnees().subscribe(data => {
        this.abonnees = data;
        this.nbr_abonnees = data.length
      });
    }


    deleteabonnee(abonnee: Abonnee) {
      this.abonneeService.deleteabonnee(abonnee.id).subscribe(() => {
        this.loadabonnees();
      });
    }

    loadArticles() {
      this.articleService.getAllarticles().subscribe(data => {
        this.articles = data;
        this.nbr_articles = data.length
      });
    }
}
