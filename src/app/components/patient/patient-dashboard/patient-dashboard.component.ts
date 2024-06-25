import { Component, OnInit } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
  imports: [BlankComponent],
})
export class PatientDashboardComponent implements OnInit {
  constructor() {
    Chart.register(...registerables); // Register chart.js components
  }
  ngOnInit(): void {
    this.initializeAppointmentHistoryChart();
  }

  initializeAppointmentHistoryChart() {
    const ctx = (
      document.getElementById('appointmentHistoryChart') as HTMLCanvasElement
    ).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Appointments',
            data: [65, 59, 80, 81, 56, 55, 40],
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
