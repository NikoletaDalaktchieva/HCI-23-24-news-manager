import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppEvent } from '../enums/event';
import { EventDispatcherService } from '../services/event-dispatcher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private subscribtions = new Subscription();

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private eventDispatcherService: EventDispatcherService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.eventDispatcherService.getEvent(AppEvent.LogIn)?.subscribe({
      next: () => this.router.navigate(['/']),
      error: () =>
        //TODO not working
        this.snackBar.open('Wrong username or password', '', {
          duration: 3000,
        }),
    });
  }

  login(loginData: { username: string; password: string }) {
    this.loginService.login(loginData.username, loginData.password);
  }
  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }
}
