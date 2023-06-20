import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public title: string = 'Patatas Subscribers ToGo'
  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  public onDestroy$ : Subject<void> = new Subject();

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public login() {
    const data = this.loginForm.value;
    this.loginService
      .login(data)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(({ Token }) => {
        this.loginService.setUserToken(Token)
        this.router.navigateByUrl('/subscribers')
      }); 
  }



}
