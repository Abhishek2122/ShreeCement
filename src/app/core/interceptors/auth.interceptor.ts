import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, last, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    private readonly whitelist: string[] = [
        '/api/login',
        '/api/register',
        '/api/public-data',
        '/LiveBackEnd/',
    ];

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isWhitelisted = this.whitelist.some(url => req.url.includes(url));

        if (isWhitelisted) {
            return next.handle(req);
        }

        const token = localStorage.getItem('token');

        let authReq = req;
        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `JWT ${token}`
                }
            });
        }

        return next.handle(authReq).pipe(
            last(), // 👈 ensures we handle only the final event
            tap((event) => {
                if (event instanceof HttpResponse) {
                    const newToken = event.headers.get('x-new-token');
                    if (newToken) {
                        localStorage.setItem('token', newToken);
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Clear token if needed
                    localStorage.removeItem('token');
                    // Redirect to login page
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}
