import { Component, OnInit } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';
import { SharedModule } from '../../../common/shared/shared.module';
import { HttpService } from '../../../services/http.service';
import { PatientAppointmentsModel } from '../../../models/patientAppointmentsModel';
import { Paginate } from '../../../models/paginateModel';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-patient-appointment-list',
  standalone: true,
  templateUrl: './patient-appointment-list.component.html',
  styleUrl: './patient-appointment-list.component.scss',
  imports: [BlankComponent, SharedModule],
})
export class PatientAppointmentListComponent implements OnInit {
  ngOnInit(): void {
    this.getPatientAppointments();
  }
  /**
   *
   */
  constructor(private http:HttpService , private swalService:SwalService) {}
  tab: 'past' | 'today' = 'today';

  setTab(tab: 'past' | 'today') {
    this.tab = tab;
    this.getPatientAppointments();
  }

  appointments: Paginate<PatientAppointmentsModel[]>;
  getPatientAppointments() {
    if(this.tab == "today"){
      this.http
      .get<any>(
        `Appointment/GetPaginatedPatientNewAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
      )
      .subscribe((res) => {
        this.appointments = res.patientAppointments;
        this.totalPages = this.appointments.pagination.totalPages;
      });
    }
    else if(this.tab =="past"){
      this.http
      .get<any>(
        `Appointment/GetPaginatedPatientOldAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
      )
      .subscribe((res) => {
        this.appointments = res.patientAppointments;
        this.totalPages = this.appointments.pagination.totalPages;
      });
    }
  }

  canceledAppointment(appointmendId:number){
   this.swalService.callSwal("Randevu İptali","Randevunuzu iptal etmek istediğinizden emin misiniz?",()=>{
    this.http.post(`Appointment/CancelAppointmentByPatient`,{appointmentId:appointmendId})
    .subscribe(()=>{
      this.getPatientAppointments();
      this.swalService.callToast("Randenuz iptal edilmiştir.");
    })
   },"Evet")
  }
  currentDate:Date= new Date();
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
      this.getPatientAppointments();
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getPatientAppointments();
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getPatientAppointments();
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.appointments.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getPatientAppointments();
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getPatientAppointments();
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
    this.getPatientAppointments();
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }
}
