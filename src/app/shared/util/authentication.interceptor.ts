import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';
import {tap} from 'rxjs/operators';
import {JwtService} from '../service/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let authRequest = request;
    const token = this.jwtService.getCurrentToken();
    if (token != null) {
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authRequest).pipe(
    // @ts-ignore
      tap((response: HttpResponse<any>) => {
      const authorization = response.headers?.get('Authorization');
      if (authorization) {
        this.jwtService.setJwtToken(authorization.replace('Bearer', '').trim());
      }
    }));
  }

}


