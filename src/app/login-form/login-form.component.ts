import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  user: User | null | undefined;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.login('Test', 'TestPass');
    this.user = this.loginService.getUser();
  }
}
