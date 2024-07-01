import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { HttpService } from '../../../services/http.service';
import { take } from 'rxjs';
import { Paginate } from '../../../models/paginateModel';
import { DoctorModel } from '../../../models/doctorModel';
import { BranchModel } from '../../../models/branchModel';
import { SharedModule } from '../../../common/shared/shared.module';
import { Title } from 'chart.js/dist';
import { TitleModel } from '../../../models/titleModel';
import { ImageUrl } from '../../../common/constants/imageUrl';
import { SwalService } from '../../../services/swal.service';

@Component({
    selector: 'app-admin-doctor',
    standalone: true,
    templateUrl: './admin-doctor.component.html',
    styleUrl: './admin-doctor.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class AdminDoctorComponent implements OnInit{
    ngOnInit(): void {
        this.getDoctors(this.doctorQuery);
        this.getBranches();
        this.getTitles();
    }

    constructor(private http:HttpService, private swal:SwalService) {
        
    }


    titleId:number=0;
    branchId:number=0;
    search:string='';
    branches:BranchModel[];
    titles:TitleModel[];
    doctors:Paginate<DoctorModel[]>;
    pageSize: number = 10;
    getImage:ImageUrl = new ImageUrl();
    // Mevcut sayfa numarası
    pageIndex: number = 1;
  
    // Toplam sayfa sayısı
    totalPages: number;
    // Sayfaya git
    doctorQuery=`Doctor/GetDoctorDetails?&Index=${this.pageIndex}&Size=${this.pageSize}`;
    getDoctors(query:string){
        this.http.get<any>(query)
        .pipe(take(1))
        .subscribe(res=>{
            this.doctors = res.doctors;
        })
    }
    getBranches(){
        this.http.get<any>(`Branch/GetAll`)
        .pipe(take(1))
        .subscribe(res=>{
            this.branches = res.branches;
        })
    }
    doctorDelete(doctorId:number){
      this.swal.callSwal('Doktor silinecektir',"Doktoru silmek istediğinizden emin misiniz?",
        ()=>{
          this.http.post('Doctor/SoftDelete',{doctorId:doctorId})
          .pipe(take(1))
          .subscribe(res=>{
            this.swal.callToast("Silme işlemi başarılı.");
            this.getDoctors(this.doctorQuery);
          })
        }
      )
    }
    doctorActive(doctorId:number){
      this.swal.callSwal('Doktor aktif edilecektir',"Doktoru aktif etmek istediğinizden emin misiniz?",
        ()=>{
          this.http.post('Doctor/ActivateDeleted',{doctorId:doctorId})
          .pipe(take(1))
          .subscribe(res=>{
            this.swal.callToast("Aktif etme işlemi başarılı.");
            this.getDoctors(this.doctorQuery);
          })
        }
      ),"Aktif Et"
    }
    getTitles(){
        this.http.get<any>(`Title/GetAll`)
        .pipe(take(1))
        .subscribe(res=>{
            this.titles = res;
        })
    }
    getFilter(){
        if(this.branchId != 0){
            this.doctorQuery+=`&BranchId=${this.branchId}`
        }
        if(this.titleId != 0){
          this.doctorQuery+=`&TitleId=${this.titleId}`;
        }
        if(this.search){
          this.doctorQuery+=`&Search=${this.search}`;
        }
        this.getDoctors(this.doctorQuery);
    }
    clearFilter(){
        this.titleId=0
        this.branchId=0;
        this.search='';
        this.doctorQuery=`Doctor/GetDoctorDetails?&Index=${this.pageIndex}&Size=${this.pageSize}`;
        this.getDoctors(this.doctorQuery);
    }
     //Pagination
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageIndex = page;
      this.getDoctors(this.doctorQuery);
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getDoctors(this.doctorQuery);
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getDoctors(this.doctorQuery);
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.doctors.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getDoctors(this.doctorQuery);
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getDoctors(this.doctorQuery);
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
    this.getDoctors(this.doctorQuery);
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }
}
