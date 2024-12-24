import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-article',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})
export class EditArticleComponent {
  articleForm: FormGroup;
  articleId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      categorie: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.articleId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadArticle();
  }

  loadArticle() {
    this.articleService.getarticleById(this.articleId).subscribe(article => {
      this.articleForm.patchValue({
        title: article.title,
        categorie: article.categorie,
        content: article.content
      });
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.articleService.updatearticle(this.articleId, this.articleForm.value).subscribe(() => {
        this.router.navigate(['/home/list-articles']);
      });
    }
  }
}
