import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  search: String = '';
  isLogged: Boolean = true;

  constructor(private loginService: LoginService) {}

  logout() {
    this.loginService.logout();
    this.isLogged = false;
  }
}
