import { Abonnee } from './../../models/abonnee';
import { AbonneeService } from './../../services/abonnee.service';
import { Component } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  articles: Article[] = [];
  abonneeForm: FormGroup;

  constructor(private articleService: ArticleService,private abonneeService: AbonneeService, private router: Router
   , private fb: FormBuilder,
  ) {
    this.abonneeForm = this.fb.group({
      email: ['', Validators.required],
    });
   }



  currentDate = new Date().toISOString();

   onSubmit(): void {
    if (this.abonneeForm.valid) {
      const newabonnee: Abonnee = {
        email: this.abonneeForm.value.email,
        date: this.currentDate
      };

      this.abonneeService.addabonnee(newabonnee).subscribe(
        (response) => {
          console.log('Vous avez abonnèe  avec succès :', response);
          this.success();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'abonnement :', error);
          this.error('Erreur lors de l\'ajout de l\'abonnement.');
        }
      );
    } else {
      this.error('Veuillez remplir tous les champs.');
    }
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAllarticles().subscribe(data => {
      this.articles = data;
    });
  }


  error(message: string): void {
    Swal.fire({
      title: 'Erreur !',
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

  success(): void {
    Swal.fire({
      title: 'Vous avez abonné avec succès !',
      icon: 'success',
      draggable: true,
    });
  }

}
