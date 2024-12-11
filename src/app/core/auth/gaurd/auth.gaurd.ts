import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { AuthenticationService } from 'src/app/pages/authentication/services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') != null ) {
      return true;
    }
    this.router.navigate(['/authentication/login']);
    return false;
  }

  // checkUserPermissions(claim: string): boolean {
  //     return this.authenticationService.currentUser!.Permission?.some(c => c.toLowerCase() == claim.toLowerCase());
  // }


}
