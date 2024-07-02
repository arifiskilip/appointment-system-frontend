import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { BlankComponent } from "../../../blank/blank.component";
import { HttpService } from '../../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientReportsModel } from '../../../../models/patientReportsModel';
import { Paginate } from '../../../../models/paginateModel';

@Component({
    selector: 'app-doctor-report-history',
    standalone: true,
    templateUrl: './doctor-report-history.component.html',
    styleUrl: './doctor-report-history.component.scss',
    imports: [SharedModule, BlankComponent]
})
export class DoctorReportHistoryComponent implements OnInit{
  doctorId:number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(p=>{
      this.doctorId = Number.parseInt(p.get('doctorId'));
    })
    this.getDoctorReports(this.doctorReportsQuery,this.doctorId)
  }
 
  constructor(private http:HttpService, private route:ActivatedRoute, private router:Router) {
    
  }

  reports:Paginate<PatientReportsModel[]>;
  reportDetail:PatientReportsModel;
  orderby:string = 'new';
  date:Date = null;
    pageSize: number = 10;
    pageIndex: number = 1;
  doctorReportsQuery:string =`Report/GetPaginatedFilteredReportsByPatientId?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
  getDoctorReports(query:string,doctorId:number){
    this.http.get<any>(`${query}&DoctorId=`+doctorId)
    .subscribe(res=>{
      this.reports = res;
      this.totalPages = res.pagination?.totalPages;
    })
  }
  goBack() {
    this.router.navigateByUrl('/admin/doctor'); // Geri gitmek için yönlendirme yapılır
  }

  getFilter(){
    let query=this.doctorReportsQuery;
    query+=`&OrderBy=${this.orderby}`;
    if(this.date != null){
        query+=`&Date=${this.date}`;
    }
    this.getDoctorReports(query,this.doctorId);
  }
  clearFilter(){
    this.orderby='new';
    this.date=null;
    this.doctorReportsQuery = `Report/GetPaginatedFilteredReportsByPatientId?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`;
    this.getDoctorReports(this.doctorReportsQuery,this.doctorId);
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

  // Toplam sayfa sayısı
  totalPages: number;
  // Sayfaya git
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageIndex = page;
      this.getDoctorReports(this.doctorReportsQuery,this.doctorId);
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getDoctorReports(this.doctorReportsQuery,this.doctorId);
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getDoctorReports(this.doctorReportsQuery,this.doctorId);
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.reports.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getDoctorReports(this.doctorReportsQuery,this.doctorId);
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getDoctorReports(this.doctorReportsQuery,this.doctorId);
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
    this.getDoctorReports(this.doctorReportsQuery,this.doctorId);
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }
}
