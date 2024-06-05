import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
declare var $: any;

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.scss'
})
export class DoctorScheduleComponent {
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

  constructor() { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules() {

  }

  onSubmit() {
    // this.scheduleService.createSchedule(this.doctorSchedule).subscribe(() => {
    //   this.loadSchedules();
    //   this.resetForm();
    // });
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

  resetForm() {
    this.doctorSchedule = {
      day: '',
      startTime: '',
      endTime: '',
      patientInterval: ''
    };
  }
}
