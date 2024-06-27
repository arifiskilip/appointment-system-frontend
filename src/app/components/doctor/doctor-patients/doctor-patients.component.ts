import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { HttpService } from '../../../services/http.service';
import { Paginate } from '../../../models/paginateModel';
import { PatientModel } from '../../../models/patientModel';
import { ImageUrl } from '../../../common/constants/imageUrl';
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
    selector: 'app-doctor-patients',
    standalone: true,
    templateUrl: './doctor-patients.component.html',
    styleUrl: './doctor-patients.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class DoctorPatientsComponent implements OnInit{
  ngOnInit(): void {
    this.getPatients();
  }

  patients:Paginate<PatientModel[]>;
  imageUrl:ImageUrl = new ImageUrl();
  searchText:string="";
  constructor(private http:HttpService) {;
    
  }


  getPatients(){
    this.http
      .get<any>(
        `Patient/GetPatientsPaginated?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
      )
      .subscribe((res) => {
        this.patients = res.patients;
        this.totalPages = this.patients.pagination.totalPages;
      });
  }

  searchPatient(){
    if(this.searchText.length>1){
      this.http
      .get<any>(
        `Patient/GetSearchPatients?SearchTerm=${this.searchText}&Index=${this.pageIndex}&Size=${this.pageSize}`
      )
      .subscribe((res) => {
        this.patients = res;
        this.totalPages = this.patients.pagination.totalPages;
      });
    }
    else{
      this.getPatients();
    }
  }

  calculateAge(birthDateString: string): number {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
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
      this.getPatients();
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getPatients();
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getPatients();
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.patients.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getPatients();
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getPatients();
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
    this.getPatients();
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }
}
