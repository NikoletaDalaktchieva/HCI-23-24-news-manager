import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  public username = '';
  public password = '';

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  onSubmit() {
    this.loginService.login(this.username, this.password);
    console.log(this.loginService.getUser());
  }
}
