import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, tap, catchError, EMPTY } from 'rxjs';
import { api } from '../common/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private spinner: NgxSpinnerService
  ) { }


  post<T>(url: string, model?: any): Observable<T> {
    this.spinner.show();
    return this.http.post<T>(`${api}/${url}`, model).pipe(
      tap(_ => this.spinner.hide()),
      catchError(
        err => this.handleError(err))
    );
  }

  put<T>(url:string,model?:any):Observable<T>{
    this.spinner.show();
    return this.http.put<T>(`${api}/${url}`, model).pipe(
      tap(_ => this.spinner.hide()),
      catchError(
        err => this.handleError(err))
    );
  }

  delete<T>(url: string): Observable<T> {
    this.spinner.show();
    return this.http.delete<T>(`${api}/${url}`).pipe(
      tap(_ => this.spinner.hide()),
      catchError(
        err => this.handleError(err))
    );
  }

   // Generic GET method
   get<T>(url: string): Observable<T> {
    this.spinner.show();
    return this.http.get<T>(`${api}/${url}`).pipe(
      tap(() => this.spinner.hide()),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(err: any): Observable<never> {
    this.spinner.hide();
    this.error.errorHandler(err);
    return EMPTY;
  }
}
