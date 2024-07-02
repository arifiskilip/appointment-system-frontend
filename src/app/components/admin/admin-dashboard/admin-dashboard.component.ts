import { Component, OnInit } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';
import { SharedModule } from '../../../common/shared/shared.module';
import { HttpService } from '../../../services/http.service';
import { AdminDashboardModel } from '../../../models/adminDashboardModel';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  imports: [BlankComponent, SharedModule],
})
export class AdminDashboardComponent implements OnInit {

  ngOnInit(): void {
    this.getAdminDashboardModel();
    };

    constructor(private http:HttpService) {
        
    }
    appointmentCounts: any[] = [];
    adminDashboardModel:AdminDashboardModel;
    getAdminDashboardModel(){
        this.http.get<AdminDashboardModel>('Appointment/GetAdminDashboardModel')
        .pipe(take(1))
        .subscribe(res=>{
            this.adminDashboardModel = res;
            this.appointmentCounts = Object.entries(res.getAppointmentCountsByBranch).map(([key, value]) => ({ branchName: key, count: value }));
        })
    }
}
