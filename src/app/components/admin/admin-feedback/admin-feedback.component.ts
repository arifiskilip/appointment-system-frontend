import { Component, LOCALE_ID, OnInit, numberAttribute } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { Paginate } from '../../../models/paginateModel';
import { FeedbackService } from '../../../services/feedback.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FeedbackDetailModel } from '../../../models/feedbackDetailModel';
import { response } from 'express';
import { BranchModel } from '../../../models/branchModel';
import { DoctorModel } from '../../../models/doctorModel';
import { BranchListModel } from '../../../models/branchListModel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../../services/swal.service';
import { FeedbackListModel } from '../../../models/feedbackListModel';
import { HttpService } from '../../../services/http.service';
import localeTr from '@angular/common/locales/tr';
import { take } from 'rxjs';

registerLocaleData(localeTr);
declare var $:any;
@Component({
  selector: 'app-admin-feedback',
  standalone: true,
  providers:[{ provide: LOCALE_ID, useValue: 'tr-TR' }],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.scss',
  imports: [BlankComponent, CommonModule, ReactiveFormsModule]
})
export class AdminFeedbackComponent implements OnInit {

  titleItems: Paginate<FeedbackListModel[]>;
  feedbackDetail: FeedbackDetailModel;
  searchForm: FormGroup;
  minDate: string;
  clinics: BranchModel[];
  doctors: DoctorModel[];

  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private swal: SwalService
  )
  {
    this.setForm()
  }

  setForm() {
    this.searchForm = this.formBuilder.group({
      clinic: [''],
      doctor: [''],
      orderbyList: ['new']
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getFeedbacks()
    this.getBranches()
  }


  get doctorId() {
    let doctorId;
    if (this.searchForm && this.searchForm.get('doctor') != null)
      doctorId = this.searchForm.get('doctor').value || '0';
    return doctorId
  }


  get orderbyList() {
    let orderbyList;
    if (this.searchForm && this.searchForm.get('orderbyList') != null)
      orderbyList = this.searchForm.get('orderbyList').value;
    return orderbyList
  }

  get branchId() {
    let branchId;
    if (this.searchForm && this.searchForm.get('clinic') != null)
      branchId = this.searchForm.get('clinic').value || '0';
    return branchId
  }


  getFeedbacks() {
    this.feedbackService.getFeedbacksPagination(this.pageIndex, this.pageSize, this.orderbyList, this.branchId, this.doctorId)
    .pipe(take(1))
    .subscribe((response) => {
      this.titleItems = response.patientFeedbacks
      this.totalPages = this.titleItems.pagination.totalPages
      if(this.titleItems.items.length==0){
        this.swal.callToast("Geri bildirim mevcut değil.",'info');
      }
    })
  }



  onSelect(feedbackId: number): void {
    this.feedbackService.getFeedbackById(feedbackId).subscribe((response) => {
      this.feedbackDetail = response
      $('#feedbackDetail').modal('show');
    })
  }
  modalHide(){
    $('#feedbackDetail').modal('hide');
  }
  getBranches() {
    let newPath = "Branch/GetAll"
    this.http.get<BranchListModel>(newPath).subscribe(res => {
      this.clinics = res.branches
    })
  }

  getDoctors() {
    let clinicId = this.searchForm.get("clinic").value;
    if(clinicId){
      let newPath = "Doctor/GetAllByBranchId?BranchId=" + clinicId
      this.http.get<DoctorModel[]>(newPath).subscribe(res => {
        this.doctors = res
      })
    }
  }

  delete(id: number): void {
    this.swal.callSwal("Feedback Silme", "Silmek istediğinizden emin misiniz?", () => {
      this.feedbackService.delete(id).subscribe((response) => {
        this.getFeedbacks();
        this.swal.callToast("Seçilen feedback başarıyla silindi.");
      })
    }, "Evet")

  }

  onSubmit() {
    this.getFeedbacks()
  }


  onClear() {
    this.setForm();
    this.getFeedbacks()
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
      this.getFeedbacks();
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getFeedbacks();
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getFeedbacks();
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.titleItems.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getFeedbacks();
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getFeedbacks();
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
    this.getFeedbacks();
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }


}
