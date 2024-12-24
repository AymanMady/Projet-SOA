import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-add-articles',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-articles.component.html',
  styleUrl: './add-articles.component.css'
})
export class AddArticlesComponent {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      title: [''],
      categorie: [''],
      content: ['']
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const newArticle: Article = {
        title: this.articleForm.value.title,
        categorie: this.articleForm.value.categorie,
        content: this.articleForm.value.content
      };

      console.log('Données du formulaire :', newArticle); // Debug

      this.articleService.addArticle(newArticle).subscribe(
        (response) => {
          console.log('Article ajouté avec succès :', response);
          alert('Article ajouté avec succès !');
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'article :', error);
          alert('Erreur lors de l\'ajout de l\'article.');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
