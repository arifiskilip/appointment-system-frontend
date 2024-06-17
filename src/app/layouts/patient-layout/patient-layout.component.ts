import { PatientAppointmentComponent } from './../../components/patient/patient-appointment/patient-appointment.component';
import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { PatientFooterComponent } from "./patient-footer/patient-footer.component";
import { PatientSidebarComponent } from "./patient-sidebar/patient-sidebar.component";
import { PatientHeaderComponent } from "./patient-header/patient-header.component";
import { AppointmentListComponent } from '../../components/patient/patient-appointment/appointment-list/appointment-list.component';
import { AppointmentCardComponent } from '../../components/patient/patient-appointment/appointment-card/appointment-card.component';

@Component({
    selector: 'app-patient-layout',
    standalone: true,
    templateUrl: './patient-layout.component.html',
    styleUrl: './patient-layout.component.scss',
    imports: [
      SharedModule,
      PatientFooterComponent,
      PatientSidebarComponent,
      PatientHeaderComponent,
      AppointmentListComponent,
      PatientAppointmentComponent,
    ]
})
export class PatientLayoutComponent {

}
