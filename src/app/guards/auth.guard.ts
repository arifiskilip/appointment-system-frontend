import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkRoleAndVerification(next);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkRoleAndVerification(next);
  }

  private checkRoleAndVerification(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRole = route.data.expectedRole;

    return this.authService.isAuthenticated().pipe(
      switchMap(isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
          return of(false);
        }

        return this.authService.isUserVerified().pipe(
          map(isVerified => {
            if (isVerified) {
              switch (this.authService.getUserRole()) {
                case 'Admin':
                  this.router.navigateByUrl('/admin');
                  break;
                case 'Doctor':
                  this.router.navigateByUrl('/doctor');
                  break;
                case 'Patient':
                  this.router.navigateByUrl('/patient');
                  break;
              }
              return false;
            }

            switch (expectedRole) {
              case 'Admin':
                if (this.authService.isAdmin()) return true;
                break;
              case 'Doctor':
                if (this.authService.isDoctor()) return true;
                break;
              case 'Patient':
                if (this.authService.isPatient()) return true;
                break;
            }

            this.router.navigateByUrl('/unauthorized');
            return false;
          })
        );
      })
    );
  }
}
