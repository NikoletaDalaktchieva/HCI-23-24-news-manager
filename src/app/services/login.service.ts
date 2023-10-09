import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { EventDispatcherService } from './event-dispatcher.service';
import { AppEvent } from '../enums/event';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  constructor(
    private http: HttpClient,
    private eventDispatcherService: EventDispatcherService
  ) {}

  login(name: string, pwd: string) {
    const usereq = new HttpParams().set('username', name).set('passwd', pwd);

    this.http.post<User>(this.loginUrl, usereq).subscribe({
      next: (user) => {
        this.eventDispatcherService.dispatch(AppEvent.LogIn, user);
      },
    });
  }

  logout() {
    this.eventDispatcherService.dispatch(AppEvent.LogOut);
  }
}
