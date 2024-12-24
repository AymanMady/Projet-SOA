import { EditArticleRoutes } from './pages/modules/edit-article/edit-article.routes';
import { DashboardRoutes } from './pages/modules/dashboard/dashboard.routes';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/modules/dashboard/dashboard.routes').then(
            (m) => m.DashboardRoutes
          ),
      },
      {
        path: 'list-articles',
        loadChildren: () =>
          import('./pages/modules/list-articles/list-articles.routes').then(
            (m) => m.ListArticlesRoutes
          ),
      },
      {
        path: 'add-articles',
        loadChildren: () =>
          import('./pages/modules/add-articles/add-articles.routes').then(
            (m) => m.AddArticlesRoutes
          ),
      },
      {
        path: 'edit-articles/:id',
        loadChildren: () =>
          import('./pages/modules/edit-article/edit-article.routes').then(
            (m) => m.EditArticleRoutes
          ),
      }
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
