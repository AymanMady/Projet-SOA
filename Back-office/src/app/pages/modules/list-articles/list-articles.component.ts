import { Article } from './../../../models/article';
import { Component , OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2'

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
    // Appelle la méthode deleteAlert et attend la confirmation
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Voulez-vous vraiment supprimer cet article ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deletearticle(article.id).subscribe(
          () => {
            this.loadArticles();
            this.success('Article supprimé avec succès !');
          },
          (error) => {
            this.error('Une erreur est survenue lors de la suppression.');
          }
        );
      }
    });
  }


  publierArticle(article: Article) {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Voulez-vous vraiment publier cet article ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, publier",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.sendEmailsToSubscribers(article.id).subscribe(
          () => {
            this.loadArticles();
            Swal.fire({
              title: "Publié avec succès !",
              text: "L'article a été publié et les abonnés ont été notifiés.",
              icon: "success",
              confirmButtonText: "OK"
            });
          },
          (error) => {
            Swal.fire({
              title: "Erreur",
              text: "Une erreur est survenue lors de la publication de l'article.",
              icon: "error",
              confirmButtonText: "OK"
            });
          }
        );
      }
    });
  }


  error(message : string){
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  success(message: string){
    Swal.fire({
      title: message,
      icon: "success",
      draggable: true
    });
  }

  deleteAlert(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
