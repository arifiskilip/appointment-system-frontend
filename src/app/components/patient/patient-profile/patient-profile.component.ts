import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';
import { AuthService } from '../../../services/auth.service';
import { PatientModel } from '../../../models/patientModel';
import { HttpService } from '../../../services/http.service';

@Component({
    selector: 'app-patient-profile',
    standalone: true,
    templateUrl: './patient-profile.component.html',
    styleUrl: './patient-profile.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class PatientProfileComponent implements OnInit{


  /**
   *
   */
  constructor(private authService:AuthService, private http:HttpService) {
    
    
  }
  ngOnInit(): void {
    this.getPatientDetail();
  }
  activeTab: string = 'activity';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  getPatientDetail(){

    this.http.get<PatientModel>("Patient/GetPatientById?Id="+this.authService.isAuthenticatedByUserId)
    .subscribe(res=>{
      this.patient = res;
    })
  }

  patient:PatientModel;

  getCurrentAge(endDate: Date): number {
    const start = new Date();
    const end = new Date(endDate);
  
    // Milisaniye farkını hesapla
    const diffInMs = Math.abs(end.getTime() - start.getTime());
    
    // Milisaniyeyi yıllara çevir
    const msInYear = 1000 * 60 * 60 * 24 * 365.25; // Ortalama yıl süresi (365.25 gün)
    
    const years = diffInMs / msInYear;
    
    return Math.floor(years); // Tam yıl sayısını döner
  }


  //İmagess

}
