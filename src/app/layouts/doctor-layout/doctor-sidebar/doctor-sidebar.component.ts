import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { AdminMenus, DoctorMenus, MenuModel } from '../../../menu';
import { MenuPipe } from "../../../pipes/menu.pipe";
import { DoctorService } from '../../../services/doctor.service';
import { AuthService } from '../../../services/auth.service';
import { DoctorModel } from '../../../models/doctorModel';
import { ImageUrl } from '../../../common/constants/imageUrl';
import { take } from 'rxjs';

@Component({
    selector: 'app-doctor-sidebar',
    standalone: true,
    templateUrl: './doctor-sidebar.component.html',
    styleUrl: './doctor-sidebar.component.scss',
    imports: [SharedModule, MenuPipe]
})
export class DoctorSidebarComponent implements OnInit{
  ngOnInit(): void {
    
  }
  search: string = "";
  menus = DoctorMenus;
  /**
   *
   */
  constructor(private doctorService:DoctorService, private authService:AuthService) {
    this.getDoctorDetail();
    this.doctorService.user$.subscribe(user=>{
      this.doctor = user;
    })
  }

  doctor:DoctorModel;
  constImageUrl:ImageUrl = new ImageUrl();
  getDoctorDetail(){
    this.doctorService.getDoctortDetail('Doctor/GetByIdDoctor?Id='+this.authService.isAuthenticatedByUserId)
    .pipe(take(1))
    .subscribe(res=>{
      this.doctor = res;
    })
  }
  getApiUrl(){
    return "https://localhost:7073/"
}
}
