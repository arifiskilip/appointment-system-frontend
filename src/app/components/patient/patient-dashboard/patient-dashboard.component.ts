import { Component, OnInit } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';
import { Chart, registerables } from 'chart.js';
import { HttpService } from '../../../services/http.service';
import { PatientDashboardModel } from '../../../models/patientDashboardModel';
import { MonthlyAppointments } from '../../../models/monthlyAppointmentsMode';
import { PatientAppointmentsModel } from '../../../models/patientAppointmentsModel';
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
  imports: [BlankComponent,SharedModule],
})
export class PatientDashboardComponent implements OnInit {
  constructor(private http:HttpService) {
    Chart.register(...registerables); // Register chart.js components
  }
  ngOnInit(): void {
    this.getPatientDashboardModel();
  }
  patientDashboardModel:PatientDashboardModel;
  montliyAppointments:MonthlyAppointments;
  patientAppointment:PatientAppointmentsModel;
  chartLabels:string[]=[]
  chartDatas:number[]=[]
  getPatientDashboardModel(){
    this.http.get<PatientDashboardModel>("Appointment/GetPatientDashboardModel")
    .subscribe(res=>{
      this.patientDashboardModel = res
    })
    this.http.get<MonthlyAppointments>("Appointment/GetMonthlyAppointmentsByPatient")
    .subscribe(res=>{
      this.montliyAppointments = res;
      this.montliyAppointments.monthlyAppointments.map(x=>{
        this.chartLabels.push(x.month)
        this.chartDatas.push(x.count)
        
      })
      this.initializeAppointmentHistoryChart();
    })
    
    this.http.get<PatientAppointmentsModel>("Appointment/GetClosestAppointmentPatient")
    .subscribe(res=>{
      this.patientAppointment = res;
    })
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
}
