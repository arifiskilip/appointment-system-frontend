import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { BlankComponent } from "../../../blank/blank.component";
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Paginate } from '../../../../models/paginateModel';
import { HttpService } from '../../../../services/http.service';
import { appointmentsByDoctorModel } from '../../../../models/AppointmentsByDoctorModel';

@Component({
    selector: 'app-doctor-appointment-history',
    standalone: true,
    templateUrl: './doctor-appointment-history.component.html',
    styleUrl: './doctor-appointment-history.component.scss',
    imports: [SharedModule, BlankComponent]
})
export class DoctorAppointmentHistoryComponent implements OnInit{

  doctorId:number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(p=>{
      this.doctorId = Number.parseInt(p.get('doctorId'));
    })
    this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
  }

  constructor(private http:HttpService, private route:ActivatedRoute, private router:Router) {
      
  }

  pageSize: number = 10;

  // Mevcut sayfa numarası
  pageIndex: number = 1;

  // Toplam sayfa sayısı
  totalPages: number;
  appointments: Paginate<appointmentsByDoctorModel[]>;
  appointmentStatusId:number=0;
  date:Date=null;
  appointmentQuery=`Appointment/GetPaginatedAppointmentsByDoctor?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`;
  selectedFilter: string = 'all';

  goBack() {
    this.router.navigateByUrl('admin/doctor'); // Geri gitmek için yönlendirme yapılır
  }

  getAppointmentsByDoctor(query:string,doctorId:number){
    this.http.get<any>(`${query}&DoctorId=`+doctorId)
    .pipe(take(1))
    .subscribe(res=>{
      this.appointments = res.appointments;
      this.totalPages = this.appointments.pagination.totalPages;
    })
  }
  getFilter(){
    if(this.appointmentStatusId != 0){
      this.appointmentQuery+=`&AppointmentStatusId=${this.appointmentStatusId}`
    }
    if(this.date != null){
      this.appointmentQuery+=`&Date=${this.date}`;
    }
    this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
  }
  clearFilter(){
    this.appointmentStatusId=0;
    this.date=null;
    this.appointmentQuery = `Appointment/GetPaginatedAppointmentsByDoctor?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`;
    this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
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

  //Pagination
  
  // Sayfaya git
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageIndex = page;
      this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.appointments.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
    }
  }

  // Sayfa numaralarını döndürür
  getPageNumbers(): number[] {
    const pageNumbers = [];
    const maxPagesToShow = 10; // Sayfa numaralarının maksimum gösterileceği miktarı belirleyin
    const startPage = Math.max(
      1,
      this.pageIndex - Math.floor(maxPagesToShow / 2)
    );
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  // Kaç adet listeleneceğini beliritir
  goToChangeSelectedCount() {
    this.getAppointmentsByDoctor(this.appointmentQuery,this.doctorId);
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }
}