import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventDispatcherService } from './event-dispatcher.service';
import { AppEvent } from '../enums/event';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';
  private loggedIn = false;

  constructor(
    private http: HttpClient,
    private eventDispatcherService: EventDispatcherService,
    private snackBar: MatSnackBar
  ) {}

  login(name: string, pwd: string) {
    const usereq = new HttpParams().set('username', name).set('passwd', pwd);

    this.http.post<User>(this.loginUrl, usereq).subscribe({
      next: (user) => {
        this.loggedIn = true;
        this.eventDispatcherService.dispatch(AppEvent.LogIn, user);
      },
      error: () => {
        this.snackBar.open('Wrong username or password', '', {
          duration: 3000,
        });
      },
    });
  }

  logout() {
    this.loggedIn = false;
    this.eventDispatcherService.dispatch(AppEvent.LogOut);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
