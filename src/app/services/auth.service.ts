import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from './http.service';
import { IsUserVerifiedModel } from '../models/isUserVerifiedModel';
import { LocalStorageService } from './local-storage.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpService
  ) {}

  isAuthenticated(): Observable<boolean> {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      this.router.navigateByUrl('/login');
      return new Observable((observer) => observer.next(false));
    }

    const expired: boolean = this.isTokenExpired(token);

    if (expired) {
      this.router.navigateByUrl('/login');
      return new Observable((observer) => observer.next(false));
    }

     this.isUserVerified();
     return new Observable((observer)=> observer.next(true));
  }

  private isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  private isUserVerified(){
    const http = inject(HttpService);
    http.get<IsUserVerifiedModel>("Auth/IsEmailVerified").subscribe(res=>{
      if(!res.isEmailVerified){
        this.router.navigateByUrl("/verificationcode")
      }
    });
  }
}
