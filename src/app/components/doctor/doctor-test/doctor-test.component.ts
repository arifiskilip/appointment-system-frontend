import { Component } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import trLocale from '@fullcalendar/core/locales/tr'; // Türkçe yerelleştirme dosyasını import edin

declare var $:any;

@Component({
    selector: 'app-doctor-test',
    standalone: true,
    templateUrl: './doctor-test.component.html',
    styleUrl: './doctor-test.component.scss',
    imports: [BlankComponent,SharedModule,FullCalendarModule]
})
export class DoctorTestComponent {
    tab: 'past' | 'today' | 'upcoming' = 'today';
    today = new Date();
  
    appointments: Appointment[] = [
      { id: 1, patientName: 'Ahmet Yılmaz', time: '10:00', date: new Date('2024-06-20T10:30:00'), status: 'accepted' },
      { id: 2, patientName: 'Mehmet Demir', time: '10:30', date: new Date('2024-06-20T18:00:00'), status: 'pending' },
      { id: 4, patientName: 'Arif Demir', time: '11:00', date: new Date('2024-06-20T10:30:00'), status: 'rejected' },
      { id: 3, patientName: 'Ayşe Kaya', time: '11:00', date: new Date('2024-06-21T11:00:00'), status: 'pending' },
      // Daha fazla randevu
    ];
  
    get filteredAppointments() {
      const todayStart = new Date(this.today.setHours(0, 0, 0, 0));
      const todayEnd = new Date(this.today.setHours(23, 59, 59, 999));
  
      return this.appointments.filter(appointment => {
        if (this.tab === 'past') {
          return appointment.date < todayStart;
        } else if (this.tab === 'today') {
          return appointment.date >= todayStart && appointment.date <= todayEnd;
        } else if (this.tab === 'upcoming') {
          return appointment.date > todayEnd;
        }
        return false;
      });
    }
    selectedEvent: any;

    acceptAppointment(id: number) {
      this.appointments = this.appointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'accepted' } : appointment
      );
    }
  
    rejectAppointment(id: number) {
      this.appointments = this.appointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'rejected' } : appointment
      );
    }
  
    setTab(tab: 'past' | 'today' | 'upcoming') {
      this.tab = tab;
    }
  
    calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: trLocale,
      events: this.appointments.map(appointment => ({
        id:appointment.id.toString(),
        title: appointment.patientName,
        start: appointment.date,
        color: appointment.status === 'accepted' ? 'green' : appointment.status === 'rejected' ? 'red' : 'orange'
      })),
      eventClick: this.handleEventClick.bind(this) // add eventClick callback
    };
  
    handleEventClick(arg:any) {
      this.selectedEvent = arg.event;
      $('#eventModal').modal('show');
    }
}
interface Appointment {
    id: number;
    patientName: string;
    time: string;
    date: Date;
    status: 'accepted' | 'rejected' | 'pending';
  }