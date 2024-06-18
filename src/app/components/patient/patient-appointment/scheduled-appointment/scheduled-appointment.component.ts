import { AppointmentCardComponent } from './../appointment-card/appointment-card.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output, input } from '@angular/core';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';

@Component({
    selector: 'app-scheduled-appointment',
    standalone: true,
    templateUrl: './scheduled-appointment.component.html',
    styleUrl: './scheduled-appointment.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        AppointmentListComponent,
        AppointmentCardComponent,
    ]
})
export class ScheduledAppointmentComponent implements OnInit {
  appointments = [
    { id: 1, date: new Date(2023, 3, 25, 14, 30), branch: 'Dermatology', title: 'Doctor', doctor: 'John Doe', status: 'Completed'},
    { id: 2, date: new Date(2023, 4, 1, 16, 0), branch: 'Cardiology', title: 'Doctor', doctor: 'Jane Douglas', status: 'Completed'},
    { id: 3, date: new Date(2023, 2, 20, 10, 30), branch: 'Oncology', title: 'Doctor', doctor: 'Michael Johnson', status: 'Completed'},
    { id: 4, date: new Date(2025, 2, 25, 14, 30), branch: 'Neurology', title: 'Professor Doctor', doctor: 'Alice Smith', status: 'Created'},
    { id: 5, date: new Date(2025, 3, 1, 16, 0), branch: 'Urology', title: 'Doctor', doctor: 'David Black', status: 'Cancelled'},
    { id: 6, date: new Date(2025, 2, 20, 10, 30), branch: 'Psychiatry', title: 'Professor Doctor', doctor: 'Walter White', status: 'Created'},

    // Tarihler yıl, ay (0'dan başlar), gün, saat, dakika formatındadır.
  ];

  buttonLabel: string = 'Detay';
  buttonCancel: string = 'İptal Et';
  imgUrl: string = 'https://avatar.iran.liara.run/public/job/doctor/male';

  scheduledAppointments: { id: number; date: Date; title: string, branch: string; doctor: string; status: string; }[] = [];
  pastAppointments: { id: number; date: Date; title: string, branch: string; doctor: string; status: string; }[] = [];

  constructor() {}

  ngOnInit(): void {
    const now = new Date();
    this.appointments.forEach((appointment) => {
      if (appointment.date > now) {
        this.scheduledAppointments.push(appointment);
      } else {
        this.pastAppointments.push(appointment);
      }
    });
  }
}
