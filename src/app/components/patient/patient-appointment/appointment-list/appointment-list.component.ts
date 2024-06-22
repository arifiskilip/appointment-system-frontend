import { AppointmentIntervalsSearchModel } from './../../../../models/appointmentIntervalsSearchModel';
import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";
import { HttpService } from '../../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginate } from '../../../../models/paginateModel';
import { SwalService } from '../../../../services/swal.service';
import { ImageUrl } from '../../../../common/constants/imageUrl';

@Component({
    selector: 'app-appointment-list',
    standalone: true,
    templateUrl: './appointment-list.component.html',
    styleUrl: './appointment-list.component.scss',
    imports: [BlankComponent]
})
export class AppointmentListComponent implements OnInit{
  query: string = '';
  appointmentIntervalsSearchModel: AppointmentIntervalsSearchModel[];
  imageUrl: ImageUrl = new ImageUrl();

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.query = '';
    this.activatedRoute.queryParams.subscribe(params => {
      const clinicId = params['clinicId'] ?? '';
      const doctorId = params['doctorId'] ?? '';
      const startDate = params['startDate'] ?? '';
      const endDate = params['endDate'] ?? '';
      const page = params['page'] ?? '';

      this.query = this.buildQuery({ clinicId, doctorId, startDate, endDate });

      if (this.query.length > 0 && page === 'list') {
        this.http.get<any>('AppointmentInterval/Search' + this.query)
          .subscribe(res => {
            this.appointmentIntervalsSearchModel = res.appointmentIntervals.items;
          });
      }
    });
  }

  buildQuery(params: { [key: string]: string }): string {
    const queryParts = [];
    if (params.clinicId) queryParts.push(`BranchId=${params.clinicId}`);
    if (params.doctorId) queryParts.push(`DoctorId=${params.doctorId}`);
    if (params.startDate) queryParts.push(`StartDate=${params.startDate}`);
    if (params.endDate) queryParts.push(`EndDate=${params.endDate}`);
    return queryParts.length > 0 ? '?' + queryParts.join('&') : '';
  }

  onPrevious(): void {
    this.swal.callSwal(
      "Geri gitmek istediğinize emin misiniz?",
      "Tüm işlemleriniz geri alınacaktır.",
      () => {
        this.query = '';
        this.router.navigateByUrl('/patient/appointment');
      },
      "Evet"
    );
  }

  getPaginatedGroupedIntervalsByDoctorId(doctorId: number): void {
    const queryParams = {
      doctorId: doctorId,
      page: 'times'
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge' // mevcut query parametrelerini korur
    });
  }
}
