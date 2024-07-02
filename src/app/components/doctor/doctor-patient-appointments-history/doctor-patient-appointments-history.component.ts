import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginate } from '../../../models/paginateModel';
import { PatientAppointmentsModel } from '../../../models/patientAppointmentsModel';
import { SharedModule } from '../../../common/shared/shared.module';
import { BlankComponent } from "../../blank/blank.component";


@Component({
    selector: 'app-doctor-patient-appointments-history',
    standalone: true,
    templateUrl: './doctor-patient-appointments-history.component.html',
    styleUrl: './doctor-patient-appointments-history.component.scss',
    imports: [SharedModule, BlankComponent]
})
export class DoctorPatientAppointmentsHistoryComponent implements OnInit{

  patientId:number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(p=>{
      this.patientId = Number.parseInt(p.get('patientId'));
    })
    this.getAppointmentsByPatient(this.patientId);
  }

  constructor(private http:HttpService, private route:ActivatedRoute, private router:Router) {
      
  }

  appointments: Paginate<PatientAppointmentsModel[]>;
  selectedFilter: string = 'all';

  goBack(): void {
    this.router.navigate(['/doctor/patients']); // Geri gitmek için yönlendirme yapılır
  }

  onFilterChange(event: any): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    // Filtreye göre randevu verilerini yükleme işlemi yapılır
    if (this.selectedFilter === 'all') {
      this.getAppointmentsByPatient(this.patientId);
    } else if (this.selectedFilter === 'mine') {
      this.getAppointmentsByPatientAndDoctorId(this.patientId);
    }
  }

  getAppointmentsByPatient(patientId:number){
    this.http.get<any>(`Appointment/GetPaginatedAppointmentsByPatient?PatientId=${patientId}&PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
    .pipe(take(1))
    .subscribe(res=>{
      this.appointments = res.appointments;
    })
  }

  getAppointmentsByPatientAndDoctorId(patientId:number){
    this.http.get<any>(`Appointment/GetPaginatedAppointmentsByPatientAndAuthDoctor?PatientId=${patientId}&PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
    .pipe(take(1))
    .subscribe(res=>{
      this.appointments = res.appointments;
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




   //Pagination
   pageSize: number = 10;

   // Mevcut sayfa numarası
   pageIndex: number = 1;
 
   // Toplam sayfa sayısı
   totalPages: number;
   // Sayfaya git
   goToPage(page: number) {
     if (page >= 1 && page <= this.totalPages) {
       this.pageIndex = page;
       this.getAppointmentsByPatient(this.patientId);
     }
   }
 
   // Önceki sayfaya git
   prevPage() {
     if (this.pageIndex > 1) {
       this.pageIndex--;
       this.getAppointmentsByPatient(this.patientId);
     }
   }
 
   // Sonraki sayfaya git
   nextPage() {
     if (this.pageIndex < this.totalPages) {
       this.pageIndex++;
       this.getAppointmentsByPatient(this.patientId);
     }
   }
 
   // İlk sayfaya git
   goToFirstPage() {
     if (this.appointments.pagination.pageIndex > 1) {
       this.pageIndex = 1;
       this.getAppointmentsByPatient(this.patientId);
     }
   }
 
   // Son sayfaya git
   goToLastPage() {
     if (this.totalPages > this.pageIndex) {
       this.pageIndex = this.totalPages;
       this.getAppointmentsByPatient(this.patientId);
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
     this.getAppointmentsByPatient(this.patientId);
   }
 
   // Başlangıç indisini hesaplar
   calculateStartIndex(): number {
     return (this.pageIndex - 1) * this.pageSize + 1;
   }

}
