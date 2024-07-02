import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles = next.data['roles'] as Array<string>;
    console.log(allowedRoles)
    const userRole = this.authService.getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      this.router.navigateByUrl('/unauthorized');
      return false;
    }

    return true;
  }
}
