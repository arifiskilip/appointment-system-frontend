import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduledAppointmentComponent } from '../scheduled-appointment/scheduled-appointment.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

interface Appointment {
  id: number;
  date: Date | string | null;
  branch: string;
  title: string;
  doctor: string;
  status: string | undefined | null;
}

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentDetailsComponent implements OnInit {
  @Input() id!: number;
  @Input() imgUrl!: string;
  appointment!: Appointment;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { } // Inject the HttpClient module

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = parseInt(idParam, 10);
        this.getDetails();
      }
      console.log("id: " + this.id);
    });
  }

  getDetails() {
    this.getById(this.id).subscribe((data) => {
      this.appointment = data;
      console.log(this.appointment);
    });
  }

  getById(id: number): Observable<Appointment> {
    return this.http
    .get<Appointment>(`/patient/appointment-details/${id}`)

  }

  goBack(): void {
    this.router.navigate(['/patient/scheduled-appointment']);
  }
}
