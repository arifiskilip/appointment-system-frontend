import { Component } from '@angular/core';
import { SearchAppointmentComponent } from "./search-appointment/search-appointment.component";
import { AppointmentListComponent } from "./appointment-list/appointment-list.component";
import { AppointmentTimesComponent } from "./appointment-times/appointment-times.component";
import { SharedModule } from '../../../common/shared/shared.module';
import { BlankComponent } from "../../blank/blank.component";

@Component({
    selector: 'app-patient-appointment',
    standalone: true,
    templateUrl: './patient-appointment.component.html',
    styleUrl: './patient-appointment.component.scss',
    imports: [SharedModule, SearchAppointmentComponent, AppointmentListComponent, AppointmentTimesComponent, BlankComponent]
})
export class PatientAppointmentComponent {
  currentPage: string = 'search'; // Başlangıç sayfası

  navigate(page: string) {
    this.currentPage = page;
  }
}
