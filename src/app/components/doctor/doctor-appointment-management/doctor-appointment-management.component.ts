// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-doctor-appointment-management',
//   standalone: true,
//   imports: [],
//   templateUrl: './doctor-appointment-management.component.html',
//   styleUrl: './doctor-appointment-management.component.scss'
// })
// export class DoctorAppointmentManagementComponent {

// }

import { Component, ElementRef, ViewChild } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import trLocale from '@fullcalendar/core/locales/tr'; // Türkçe yerelleştirme dosyasını import edin
import { title } from 'node:process';

declare var $: any;

@Component({
  selector: 'app-doctor-appointment-management',
  standalone: true,
  templateUrl: './doctor-appointment-management.component.html',
  //   styleUrl: './doctor-appointment-management.component.scss'
  imports: [BlankComponent, SharedModule, FullCalendarModule]
})
export class DoctorAppointmentManagementComponent {

  tab: 'waiting' | 'accepted' | 'rejected' = 'waiting';
  today = new Date();

  appointments: Appointment[] = [
    { id: 1, patientName: 'Ahmet Yılmaz', time: '10:00', date: new Date('2024-06-21T10:30:00'), status: 'accepted' },
    { id: 2, patientName: 'Mehmet Demir', time: '10:30', date: new Date('2024-06-21T18:00:00'), status: 'pending' },
    { id: 4, patientName: 'Arif Demir', time: '11:00', date: new Date('2024-06-21T10:30:00'), status: 'rejected' },
    { id: 5, patientName: 'Ayşe Kaya', time: '11:30', date: new Date('2024-06-21T11:00:00'), status: 'pending' },
    { id: 6, patientName: 'Zeynep Demir', time: '12:00', date: new Date('2024-06-19T18:00:00'), status: 'pending' },
    { id: 7, patientName: 'Ayça Demir', time: '12:30', date: new Date('2024-06-18T10:30:00'), status: 'rejected' },
    { id: 8, patientName: 'Ali Kaya', time: '13:00', date: new Date('2024-06-19T11:00:00'), status: 'pending' },
    // Daha fazla randevu
  ];

  
  get filteredAppointments() {
    const todayStart = new Date(this.today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(this.today.setHours(23, 59, 59, 999));

    return this.appointments.filter(appointment => {
      if (this.tab === 'waiting') {
        return appointment.date >= todayStart && appointment.date <= todayEnd && appointment.status == 'pending';
      } else if (this.tab === 'accepted') {
        return appointment.date >= todayStart && appointment.date <= todayEnd && appointment.status == 'accepted';
      } else if (this.tab === 'rejected') {
        return appointment.date >= todayStart && appointment.date <= todayEnd && appointment.status == 'rejected';
      }
      return false;
    });
  }

  acceptAppointment(id: number) {
    this.appointments = this.appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: 'accepted' } : appointment
    );
    this.getCalendarOptions()
  }

  rejectAppointment(id: number) {
    this.appointments = this.appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: 'rejected' } : appointment
    );
    this.getCalendarOptions()
  }

  waitedAppointment(id: number) {
    this.appointments = this.appointments.map(appointment =>
      appointment.id === id ? { ...appointment, status: 'pending' } : appointment
    );
    this.getCalendarOptions()
  }

  setTab(tab: 'waiting' | 'accepted' | 'rejected') {
    this.tab = tab;
  }
 
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: trLocale,
    events: this.getCalendarOptions()
  };

 

  getCalendarOptions (): any[]
  {
   return this.appointments.map(appointment => ({
      title: appointment.patientName,
      start: appointment.date,
      color: appointment.status === 'accepted' ? 'green' : appointment.status === 'rejected' ? 'red' : 'orange'
    }))

  }
}

interface Appointment {
  id: number;
  patientName: string;
  time: string;
  date: Date;
  status: 'accepted' | 'rejected' | 'pending';
}




