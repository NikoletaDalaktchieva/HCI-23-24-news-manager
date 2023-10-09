import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user: User | undefined | null;

  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  private message: string | undefined;

  private httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'x-www-form-urlencoded'),
  };

  constructor(private http: HttpClient) {}

  isLogged() {
    return this.user != null;
  }

  login(name: string, pwd: string): Observable<User> {
    const usereq = new HttpParams().set('username', name).set('passwd', pwd);

    return this.http.post<User>(this.loginUrl, usereq).pipe(
      tap((user) => {
        console.log('Set user');
        this.user = user;
      })
    );
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.user = null;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
