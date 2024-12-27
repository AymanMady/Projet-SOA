import { Abonnee } from './../../models/abonnee';
import { AbonneeService } from './../../services/abonnee.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink,FormsModule,ReactiveFormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoading = false;

  articles: Article[] = [];
  abonneeForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private abonneeService: AbonneeService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.abonneeForm = this.fb.group({
      email: ['', Validators.required],
    });
   }



  currentDate = new Date().toISOString();

   onSubmit(): void {
    if (this.abonneeForm.valid) {
      this.isLoading = true;
      const newabonnee: Abonnee = {
        email: this.abonneeForm.value.email,
        date: this.currentDate
      };

      this.abonneeService.addabonnee(newabonnee).subscribe(
        (response) => {
          console.log('Vous avez abonnèe  avec succès :', response);
          this.success();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'abonnement :', error);
          this.error('Erreur lors de l\'ajout de l\'abonnement.');
          this.isLoading = false;
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
    this.isLoading = true;
    this.articleService.getAllarticles().subscribe(data => {
      this.articles = data;
      console.log('isLoading:', this.isLoading);
      this.isLoading = false;
      this.cdr.detectChanges();
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
