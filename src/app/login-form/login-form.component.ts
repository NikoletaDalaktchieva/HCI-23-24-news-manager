import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  public username = '';
  public password = '';

  constructor(
    private loginService: LoginService,
    private newsService: NewsService,
    private router: Router
  ) {}

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (user) => {
        this.newsService.setUserApiKey(user.apikey);
        this.router.navigate(['/']);
      },
      error: () => {
        console.log('An error occurred while logging in!');
      },
    });
  }
}
