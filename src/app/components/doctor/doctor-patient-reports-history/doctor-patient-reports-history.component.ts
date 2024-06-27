import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BlankComponent } from "../../blank/blank.component";
import { Paginate } from '../../../models/paginateModel';
import { PatientReportsModel } from '../../../models/patientReportsModel';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-doctor-patient-reports-history',
    standalone: true,
    templateUrl: './doctor-patient-reports-history.component.html',
    styleUrl: './doctor-patient-reports-history.component.scss',
    imports: [SharedModule, BlankComponent]
})
export class DoctorPatientReportsHistoryComponent implements OnInit{
  
  patientId:number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(p=>{
      this.patientId = Number.parseInt(p.get('patientId'));
    })
    this.loadAppointments();
  }
 
  constructor(private http:HttpService, private route:ActivatedRoute, private router:Router) {
    
  }

  reports:Paginate<PatientReportsModel[]>;
  reportDetail:PatientReportsModel;
  selectedFilter: string = 'all';
  getPatientReports(patientId:number){
    this.http.get<any>(`Report/GetPaginatedReportsByPatientId?PatientId=${patientId}&PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
    .subscribe(res=>{
      this.reports = res;
      this.totalPages = res.pagination?.totalPages;
    })
  }
  getPatientReportsByDoctor(patientId:number){
    this.http.get<any>(`Report/GetPaginatedReportsByPatientIdAndDoctorId?PatientId=${patientId}&PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
    .subscribe(res=>{
      this.reports = res;
      this.totalPages = res.pagination?.totalPages;
    })
  }
  goBack(): void {
    this.router.navigate(['/doctor/patients']); // Geri gitmek için yönlendirme yapılır
  }

  onFilterChange(event: any): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    // Filtreye göre randevu verilerini yükleme işlemi yapılır
    if (this.selectedFilter === 'all') {
      this.getPatientReports(this.patientId);
    } else if (this.selectedFilter === 'mine') {
      this.getPatientReportsByDoctor(this.patientId);
    }
  }
  setReport(model:PatientReportsModel){
    this.reportDetail = model;
  }
  getApiUrl() {
    return 'https://localhost:7073/';
  }
  dowloandReport(){
    const url = this.getApiUrl()+this.reportDetail.reportFile;
    const filename =`${this.reportDetail.patientName}-${this.reportDetail.reportId}.pdf`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      this.loadAppointments();
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.loadAppointments();
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.loadAppointments();
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.reports.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.loadAppointments();
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.loadAppointments();
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
    this.loadAppointments();
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }
}
