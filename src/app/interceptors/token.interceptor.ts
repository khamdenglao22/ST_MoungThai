import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang') || 'lo';


      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token,
            AcceptLanguage: lang,
          },
        });
      }



    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let msg = error.error.msg || 'something went wrong';
        let barId = error.error.bar_id;

        if (error.status == 403) {
          this.snackbar.open(msg, '', {
            duration: 3000,
          });
        } else if (error.status == 401) {
          this.router.navigate(['/login']);
        }
        return throwError({ msg, bar_id: barId });
      })
    );
  }
}
