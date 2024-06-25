import { AuthService } from './../../../../services/auth.service';
import { Paginate } from './../../../../models/paginateModel';
import { GroupedIntervalsByDoctorIdModel } from './../../../../models/groupedIntervalsByDoctorIdModel';
import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { BlankComponent } from "../../../blank/blank.component";
import { SwalService } from '../../../../services/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import { IntervalDatesModel } from '../../../../models/intervalDatesModel';


@Component({
    selector: 'app-appointment-times',
    standalone: true,
    templateUrl: './appointment-times.component.html',
    styleUrl: './appointment-times.component.scss',
    imports: [SharedModule, BlankComponent]
})
export class AppointmentTimesComponent implements OnInit{

  groupedIntervals: Paginate<GroupedIntervalsByDoctorIdModel[]>;
  pageIndex: number = 1;
  pageSize: number = 1;
  currentDay: string;
  groupedIntervalss: Map<string, IntervalDatesModel[]>;

  constructor(
    private swal: SwalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getGroupedIntervals();
  }

  getGroupedIntervals(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["doctorId"]) {
        const doctorId: number = Number.parseInt(params["doctorId"], 10);
        this.http.get<any>(`AppointmentInterval/GetPaginatedGroupedIntervalsByDoctorId?Index=${this.pageIndex}&Size=${this.pageSize}&DoctorId=${doctorId}`)
          .subscribe(res => {
            this.groupedIntervals = res.groupedIntervalsByDoctorIdDto;
            if (this.groupedIntervals.items.length > 0) {
              this.groupedIntervalss = this.groupByHour(this.groupedIntervals.items[0].intervalDates);
            }
            console.log(this.groupedIntervalss);
          });
      }
    });
  }

  submit(intervalId: number, intervalDate: Date): void {
    const date: Date = new Date(intervalDate);
    const day: string = date.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    this.swal.callSwal(
      "Bilgi",
      `<strong>ÖNEMLİ</strong> Randevunuzu kaydettiğinizde, onay işleminiz <strong><i>${day}</i></strong> tarihi arasında gerçekleşecektir. Onaylanmayan randevular otomatik olarak iptal edilmiş sayılır. Randevuyu onaylamak istediğinize emin misiniz? (RND6140).`,
      () => {
        this.http.post<any>("Appointment/Add",{patientId:this.authService.isAuthenticatedByUserId,appointmentIntervalId:intervalId}).subscribe(res => {
          this.swal.callToast("Randevunuz başarıyla oluşturuldu.", "success");
          this.router.navigateByUrl('/patient');
        });
      },
      "Onayla",
      "info"
    );
  }

  onPrevious(): void {
    this.swal.callSwal("Geri gitmek istediğinize emin misiniz?", "Tüm işlemleriniz geri alınacaktır.", () => {
      this.router.navigateByUrl('/patient/appointment');
    }, "Evet");
  }

  hasNextPage(): void {
    this.pageIndex++;
    this.getGroupedIntervals();
  }

  hasPreviousPage(): void {
    this.pageIndex--;
    this.getGroupedIntervals();
  }

  groupByHour(intervals: IntervalDatesModel[]): Map<string, IntervalDatesModel[]> {
    const grouped = new Map<string, IntervalDatesModel[]>();

    intervals.forEach(interval => {
      const date = new Date(interval.intervalDate);
      const hour = date.getHours();
      this.currentDay = date.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const key = `${hour}:00 - ${hour + 1}:00`;

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }

      grouped.get(key)?.push(interval);
    });

    return grouped;
  }

  
}
