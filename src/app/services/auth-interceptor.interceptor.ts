import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {take, exhaustMap} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = JSON.parse(localStorage.getItem('userData'));
    if(user != null)
    {
      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user._token}`
        }
      });
      return next.handle(modifiedReq);
    }
    else
      return next.handle(req);
   
  }
}
