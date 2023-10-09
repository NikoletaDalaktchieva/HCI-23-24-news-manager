import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppEvent } from '../enums/event';
import { EventDispatcherService } from '../services/event-dispatcher.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private subscribtions = new Subscription();
  public username = '';
  public password = '';

  constructor(
    private loginService: LoginService,
    private eventDispatcherService: EventDispatcherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventDispatcherService.getEvent(AppEvent.LogIn)?.subscribe({
      next: () => this.router.navigate(['/']),
    });
  }

  onSubmit() {
    this.loginService.login(this.username, this.password);
  }
  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }
}
