import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Chart, registerables } from 'chart.js';
import trLocale from '@fullcalendar/core/locales/tr'; // Türkçe yerelleştirme dosyasını import edin
import { HttpService } from '../../../services/http.service';
import { SharedModule } from '../../../common/shared/shared.module';
import { DoctorDashboardModel } from '../../../models/doctorDashboardModel';
import { MonthlyAppointments } from '../../../models/monthlyAppointmentsMode';
import { GetAppointmentsForCurrentDayByDoctorModel } from '../../../models/getAppointmentsForCurrentDayByDoctorModel';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';

registerLocaleData(localeTr);
@Component({
    selector: 'app-doctor-dashboard',
    standalone: true,
    templateUrl: './doctor-dashboard.component.html',
    providers:[{ provide: LOCALE_ID, useValue: 'tr-TR' }],
    styleUrl: './doctor-dashboard.component.scss',
    imports: [BlankComponent,FullCalendarModule,SharedModule]
})
export class DoctorDashboardComponent implements OnInit{
    ngOnInit(): void {
      this.getDoctorDashboardModel();
    }
    constructor(private http:HttpService) {  
      Chart.register(...registerables);  
    }
    doctorDashboardModel:DoctorDashboardModel;
    montliyAppointments:MonthlyAppointments;
    doctorAppointments:GetAppointmentsForCurrentDayByDoctorModel[];
    chartLabels:string[]=[]
    chartDatas:number[]=[]

    getDoctorDashboardModel(){
      this.http.get<DoctorDashboardModel>("Appointment/GetDoctorDashboardModel")
      .subscribe(res=>{
        this.doctorDashboardModel = res
      })
      this.http.get<MonthlyAppointments>("Appointment/GetMonthlyAppointmentsByDoctor")
      .subscribe(res=>{
        this.montliyAppointments = res;
        this.montliyAppointments.monthlyAppointments.map(x=>{
          this.chartLabels.push(x.month)
          this.chartDatas.push(x.count)
          
        })
        this.initializeAppointmentHistoryChart();
      })
      
      this.http.get<GetAppointmentsForCurrentDayByDoctorModel[]>("Appointment/GetAppointmentsForCurrentDayByDoctor")
      .subscribe(res=>{
        this.doctorAppointments = res;
      })
    }
    getBadgeStatusIcon(appointmentStatus: string) {
      switch (appointmentStatus) {
        case 'Created':
          return { css: 'badge badge-warning', value: 'Beklemede' };
        case 'Completed':
          return { css: 'badge badge-success', value: 'Tamamlandı' };
        case 'Canceled':
          return { css: 'badge badge-danger', value: 'İptal Edildi' };
        default:
          return { css: 'badge badge-secondary', value: 'Beklemede' };
      }
    }
    initializeAppointmentHistoryChart() {
      const ctx = (
        document.getElementById('appointmentHistoryChart') as HTMLCanvasElement
      ).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: 'Randevularım',
              data: this.chartDatas,
              backgroundColor: 'rgba(60, 141, 188, 0.9)',
              borderColor: 'rgba(60, 141, 188, 0.8)',
         
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        locale: trLocale, // Takvimi Türkçeleştirin
        weekends: false,
        eventColor:'blue',
        eventBorderColor:'blue',
        events: [
          { title: 'Mevcut Gün', 
            start: new Date(),
           }
        ]
      };
}
