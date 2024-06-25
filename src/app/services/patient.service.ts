import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PatientModel } from '../models/patientModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpService) { }

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getPatientDetail(url:string){
    return this.http.get<PatientModel>(url);
  }
}
