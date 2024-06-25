import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from './http.service';
import { IsUserVerifiedModel } from '../models/isUserVerifiedModel';
import { LocalStorageService } from './local-storage.service';
import { Observable, map, of } from 'rxjs';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpService,
    private localStorage: LocalStorageService,
    private swal: SwalService
  ) {}

  isAuthenticated(): Observable<boolean> {
    const token: string | null = this.localStorage.getItem('token');

    if (!token) {
      this.router.navigateByUrl('/login');
      return of(false);
    }

    const expired: boolean = this.isTokenExpired(token);

    if (expired) {
      this.router.navigateByUrl('/login');
      return of(false);
    }

    return new Observable((observer) => {
      this.isUserVerified().subscribe((isVerified) => {
        observer.next(isVerified);
        observer.complete();
      });
    });
  }

  private isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  private isUserVerified(): Observable<boolean> {
    return new Observable((observer) => {
      this.http
        .get<IsUserVerifiedModel>('Auth/IsEmailVerified')
        .subscribe((res) => {
          if (!res.isEmailVerified) {
            this.router.navigateByUrl('/verificationcode');
            observer.next(false);
          } else {
            this.localStorage.setItem('userId', res.userId.toString());
            observer.next(true);
          }
          observer.complete();
        });
    });
  }

  logout() {
    this.swal.callSwal(
      'Çıkış Yapılacaktır',
      'Sistemden çıkmak istediğinize eminmisiniz?',
      () => {
        this.localStorage.clear();
        this.router.navigateByUrl('');
        this.swal.callToast('Çıkış işlemi başarılı.', 'success');
      },
      'Evet'
    );
  }
  get isAuthenticatedByUserId(): number {
    return parseInt(this.localStorage.getItem('userId') || '0');
  }
}
