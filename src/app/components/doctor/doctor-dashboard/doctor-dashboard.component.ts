import { Component } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import trLocale from '@fullcalendar/core/locales/tr'; // Türkçe yerelleştirme dosyasını import edin
@Component({
    selector: 'app-doctor-dashboard',
    standalone: true,
    templateUrl: './doctor-dashboard.component.html',
    styleUrl: './doctor-dashboard.component.scss',
    imports: [BlankComponent,FullCalendarModule]
})
export class DoctorDashboardComponent {
    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        locale: trLocale, // Takvimi Türkçeleştirin
        weekends: false,
        eventColor:'blue',
        eventBorderColor:'blue',
        events: [
          { title: 'Mevcut Gün', start: new Date() }
        ]
      };
}
