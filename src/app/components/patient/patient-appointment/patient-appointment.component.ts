import { Component } from '@angular/core';
import { SearchAppointmentComponent } from "./search-appointment/search-appointment.component";
import { AppointmentListComponent } from "./appointment-list/appointment-list.component";
import { AppointmentTimesComponent } from "./appointment-times/appointment-times.component";
import { SharedModule } from '../../../common/shared/shared.module';
import { BlankComponent } from "../../blank/blank.component";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-patient-appointment',
    standalone: true,
    templateUrl: './patient-appointment.component.html',
    styleUrl: './patient-appointment.component.scss',
    imports: [SharedModule, SearchAppointmentComponent, AppointmentListComponent, AppointmentTimesComponent, BlankComponent]
})
export class PatientAppointmentComponent {
  currentPage: string = 'search'; // Başlangıç sayfası

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 'search';
    });
  }

  navigate(page: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'  // Mevcut query parametreleri koru
    });
    this.currentPage = page; // Geçiş yapılan sayfayı güncelle
  }
}
