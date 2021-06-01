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
    // @ts-ignore
    return next.handle(authRequest).pipe(tap((response: HttpResponse<any>) => {
      if (response.headers && response.headers.get('Authorization')) {
        // @ts-ignore
        this.authenticationService.setJwtToken(response.headers.get('Authorization').replace('Bearer', '').trim());
      }
    }));
  }




/* tim
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isLoggedIn()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.getCurrentToken()}`
        }
      });
    }
    // @ts-ignore
    return next.handle(req).pipe(tap((response: HttpResponse<any>) => {
      if (response.headers && response.headers.get('Authorization')) {
        // @ts-ignore
        this.authenticationService.setJwtToken(response.headers.get('Authorization').replace('Bearer', '').trim());
      }
    }));
  }

*/



}


