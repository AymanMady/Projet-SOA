import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-articles',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.css'],
})
export class AddArticlesComponent {
  articleForm: FormGroup;
  imageBase64: string = ''; // Stockage temporaire de l'image encodée

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      categorie: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = (reader.result as string).split(',')[1]; // Supprime le préfixe data:image
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const newArticle: Article = {
        title: this.articleForm.value.title,
        categorie: this.articleForm.value.categorie,
        content: this.articleForm.value.content,
        image: this.imageBase64,
      };

      this.articleService.addArticle(newArticle).subscribe(
        (response) => {
          console.log('Article ajouté avec succès :', response);
          this.success();
          this.router.navigate(['/home/list-articles']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'article :', error);
          this.error('Erreur lors de l\'ajout de l\'article.');
        }
      );
    } else {
      this.error('Veuillez remplir tous les champs.');
    }
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
      title: 'Article ajouté avec succès !',
      icon: 'success',
      draggable: true,
    });
  }
}
