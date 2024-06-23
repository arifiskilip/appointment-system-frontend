import { Component, OnInit } from '@angular/core';
import { PatientMenus } from '../../../menu';
import { SharedModule } from '../../../common/shared/shared.module';
import { MenuPipe } from "../../../pipes/menu.pipe";
import { PatientService } from '../../../services/patient.service';
import { PatientModel } from '../../../models/patientModel';
import { AuthService } from '../../../services/auth.service';
import { ImageUrl } from '../../../common/constants/imageUrl';

@Component({
    selector: 'app-patient-sidebar',
    standalone: true,
    templateUrl: './patient-sidebar.component.html',
    styleUrl: './patient-sidebar.component.scss',
    imports: [SharedModule, MenuPipe]
})
export class PatientSidebarComponent implements OnInit{
  search: string = "";
  menus = PatientMenus;

  /**
   *
   */
  constructor(private patientService:PatientService, private authService:AuthService) {
    
  }
  ngOnInit(): void {
    this.getPatientDetail();
    this.patientService.user$.subscribe(user=>{
      this.patient = user;
    })
  }

  patient:PatientModel;
  constImageUrl:ImageUrl = new ImageUrl();
  getPatientDetail(){
    this.patientService.getPatientDetail("Patient/GetPatientById?Id="+this.authService.isAuthenticatedByUserId)
    .subscribe(res=>{
      this.patient = res
    })
  }

  getApiUrl(){
    return "https://localhost:7073/"
}


}
