import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../service/authentication.service';
import {RoleFeature} from '../../model/role-feature.enum';

@Injectable({
  providedIn: 'root'
})
export class BecomeCoachGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authenticationService.hasFeatureAccess(RoleFeature.becomeCoach)) {
      // coachee so return true
      return true;
    }
    this.router.navigate(['unauthorized']);
    return false;
  }

}
