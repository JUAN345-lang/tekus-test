
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly loadingService: NgxSpinnerService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show()
    const token: string = localStorage.getItem('token') || '';

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      finalize(() => this.loadingService.hide()),
      catchError((err: HttpErrorResponse) => {
        const { message } = err;
        this._snackBar.open(message, 'Cerrar')

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError(() => new Error(message));

      })
    );
  }

}
