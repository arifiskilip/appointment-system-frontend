import { Component, Input } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { Router } from '@angular/router';
declare var $: any;


@Component({
    selector: 'app-admin-patient',
    standalone: true,
    templateUrl: './admin-patient.component.html',
    styleUrl: './admin-patient.component.scss',
    imports: [BlankComponent]
})
export class AdminPatientComponent {
  @Input() id?: number;

  constructor(private router: Router) {}

  onButtonClick() {
    this.router.navigate([`/admin/patient-details/${this.id}`])
  }

  doctorSchedule = {
    day: '',
    startTime: '',
    endTime: '',
    patientInterval: ''
  };

  schedules = [
    {
      id: 1,
      day: '2024-06-05',
      startTime: '09:00',
      endTime: '12:00',
      patientInterval: 30
    },
    {
      id: 2,
      day: '2024-06-06',
      startTime: '13:00',
      endTime: '17:00',
      patientInterval: 20
    }
  ];
  selectedSchedule: any;

  loadSchedules() {

  }

  editSchedule(schedule:any) {
    this.selectedSchedule = { ...schedule };
    $('#editScheduleModal').modal('show');
  }

  onEditSubmit() {

      $('#editScheduleModal').modal('hide');
  }

  deleteSchedule() {
      this.loadSchedules();
  }
}
