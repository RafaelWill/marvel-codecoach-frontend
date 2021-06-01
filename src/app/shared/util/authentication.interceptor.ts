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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let authRequest = request;
    const token = this.authenticationService.getCurrentToken();
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
        this.authenticationService.setJwtToken(authorization.replace('Bearer', '').trim());
      }
    }));
  }

}


