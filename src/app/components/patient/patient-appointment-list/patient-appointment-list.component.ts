import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
    selector: 'app-patient-appointment-list',
    standalone: true,
    templateUrl: './patient-appointment-list.component.html',
    styleUrl: './patient-appointment-list.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class PatientAppointmentListComponent implements OnInit{
  ngOnInit(): void {
   
  }
  tab: 'past' | 'today' | 'upcoming' = 'today';
    today = new Date();
  

  
    setTab(tab: 'past' | 'today' | 'upcoming') {
      this.tab = tab;
    }

}
