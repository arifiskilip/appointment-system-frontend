import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { DoctorModel } from '../models/doctorModel';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpService) { }

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getPatientDetail(url:string){
    return this.http.get<DoctorModel>(url);
  }
}
