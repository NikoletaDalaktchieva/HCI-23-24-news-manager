import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CreateArticleComponent } from './create-article/create-article.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'articles/create', component: CreateArticleComponent },
  { path: 'articles/edit/:id', component: CreateArticleComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//ANON01_335
//DEV_TEAM_01257_3
