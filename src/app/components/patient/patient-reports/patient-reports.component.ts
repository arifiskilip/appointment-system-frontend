import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';
import { HttpService } from '../../../services/http.service';
import { SwalService } from '../../../services/swal.service';
import { Paginate } from '../../../models/paginateModel';
import { PatientReportsModel } from '../../../models/patientReportsModel';

@Component({
    selector: 'app-patient-reports',
    standalone: true,
    templateUrl: './patient-reports.component.html',
    styleUrl: './patient-reports.component.scss',
    imports: [BlankComponent, SharedModule]
})
export class PatientReportsComponent implements OnInit{
  ngOnInit(): void {
   
  }

  constructor(private http:HttpService, private swal:SwalService) {
    
  }

  reports:Paginate<PatientReportsModel[]>;
  getPatientReports(){
    this.http.get<Paginate<PatientReportsModel[]>>(`Report/GetAllReportsPatient?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
    .subscribe(res=>{
      this.reports = res;
      this.totalPages = res.pagination.totalPages;
    })
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
      this.getPatientReports();
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getPatientReports();
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getPatientReports();
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.reports.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getPatientReports();
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getPatientReports();
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
    this.getPatientReports();
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }
}
