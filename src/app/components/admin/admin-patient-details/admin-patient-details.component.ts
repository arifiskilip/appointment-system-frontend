import { Component, OnInit } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';
import { SharedModule } from '../../../common/shared/shared.module';
import { AuthService } from '../../../services/auth.service';
import { PatientModel } from '../../../models/patientModel';
import { HttpService } from '../../../services/http.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ValidDirective } from '../../../common/directives/valid.directive';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { SwalService } from '../../../services/swal.service';
import { ImageUrl } from '../../../common/constants/imageUrl';
import { PatientService } from '../../../services/patient.service';
import { Paginate } from '../../../models/paginateModel';
import { PatientAppointmentsModel } from '../../../models/patientAppointmentsModel';
import { ActivatedRoute } from '@angular/router';
import { DoctorModel } from '../../../models/doctorModel';
import { BranchModel } from '../../../models/branchModel';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackListModel } from '../../../models/feedbackListModel';
import { take } from 'rxjs';
import { FeedbackDetailModel } from '../../../models/feedbackDetailModel';
import { PatientReportsModel } from '../../../models/patientReportsModel';

declare var $:any;

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  templateUrl: './admin-patient-details.component.html',
  styleUrls: ['./admin-patient-details.component.scss'],
  imports: [BlankComponent, SharedModule, ValidDirective],
})
export class AdminPatientDetailsComponent implements OnInit {
  patient: PatientModel;
  patientAppointments: Paginate<PatientAppointmentsModel[]>;
  patientEditForm: FormGroup;
  patientPasswordUpdateForm: FormGroup;
  validationMessages: ValidationMessages = new ValidationMessages();
  constImageUrl: ImageUrl = new ImageUrl();
  activeTab: string = 'activity';
  image: File;
  imageUrls: { imageUrl: string; name: string; size: number }[] = [];
  isImageSelected = false;
  searchForm: FormGroup;
  doctors: DoctorModel[];
  clinics: BranchModel[];
  titleItems: Paginate<FeedbackListModel[]>;
  minDate: string;
  feedbackDetail: FeedbackDetailModel;
  patientId: number;
  reports:Paginate<PatientReportsModel[]>;
  reportDetail:PatientReportsModel;


  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private swal: SwalService,
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPatientDetail();
    this.createPatientEditForm();
    this.createPatientPasswordUpdateForm();
    this.getPatientAppointments();
    this.getPatientReports();

  }

  //Geri bildirimler
  getDoctors() {
    let clinicId = this.searchForm.get("clinic").value;
    if(clinicId){
      let newPath = "Doctor/GetAllByBranchId?BranchId=" + clinicId
      this.http.get<DoctorModel[]>(newPath).subscribe(res => {
        this.doctors = res
      })
    }
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

  onSubmit() {
    this.getFeedbacks()
  }


  onClear() {
    this.setForm();
    this.getFeedbacks()
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

  delete(id: number): void {
    this.swal.callSwal("Feedback Silme", "Silmek istediğinizden emin misiniz?", () => {
      this.feedbackService.delete(id).subscribe((response) => {
        this.getFeedbacks();
        this.swal.callToast("Seçilen feedback başarıyla silindi.");
      })
    }, "Evet")

  }

//Raporlar

getPatientReports(){
  this.route.paramMap.subscribe((params) => {
    const patientId = params.get('id');
  this.http.get<any>(`Report/GetPaginatedReportsByPatientId?PatientId=${patientId}&PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
  .subscribe(res=>{
    console.log('HTTP Resp:', res);
    this.reports = res;
    this.totalPages = res.pagination?.totalPages;
  })
});
}

setReport(model:PatientReportsModel){
  this.reportDetail = model;
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




  getApiUrl() {
    return 'https://localhost:7073/';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  groupedAppointments: { [key: string]: PatientAppointmentsModel[] } = {};
  getPatientAppointments() {
    this.route.paramMap.subscribe((params) => {
      const patientId = params.get('id');
        this.http
          .get<any>(`Appointment/GetPaginatedAppointmentsByPatient?PatientId=${patientId}&PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
          .subscribe((res) => {
            this.patientAppointments = res.appointments;
            this.groupedAppointments = {};
            this.patientAppointments?.items.forEach((appointment) => {
              const date = new Date(appointment.intervalDate).toLocaleDateString(
                'tr-TR',
                { year: 'numeric', month: 'short', day: 'numeric' }
              );
              if (!this.groupedAppointments[date]) {
                this.groupedAppointments[date] = [];
              }
              this.groupedAppointments[date].push(appointment);
            });
          });
    });
  }
// groupedAppointments: { [key: string]: PatientAppointmentsModel[] } = {};
  // getPatientAppointments() {
  //   this.route.paramMap.subscribe((params) => {
  //     const patientId = params.get('id');
  //     this.http
  //       .get<any>(`Appointment/GetPaginatedAppointmentsByPatient?PatientId=${patientId}`)
  //       .subscribe((res) => {
  //         this.patientAppointments = res.patientAppointments;
  //         this.patientAppointments.items.forEach((appointment) => {
  //                   const date = new Date(appointment.intervalDate).toLocaleDateString(
  //                     'tr-TR',
  //                     { year: 'numeric', month: 'short', day: 'numeric' }
  //                   );
  //                   if (!this.groupedAppointments[date]) {
  //                     this.groupedAppointments[date] = [];
  //                   }
  //                   this.groupedAppointments[date].push(appointment);
  //                 });
  //       });
  //   });

  // }

  getDates(): string[] {
    return Object.keys(this.groupedAppointments);
  }

  // getDates(): string[] {
  //   return Object.keys(this.groupedAppointments);
  // }

  getStatusIcon(appointmentStatus: string): string {
    switch (appointmentStatus) {
      case 'Created':
        return 'fas fa-calendar-alt bg-primary';
      case 'Completed':
        return 'fas fa-check-circle bg-success';
      case 'Canceled':
        return 'fas fa-times-circle bg-danger';
      default:
        return 'fas fa-info-circle bg-secondary';
    }
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

  forwardPage() {
    if(this.patientAppointments.pagination.hasNextPage){
      this.pageIndex++;
      this.getPatientAppointments();
    }
  }

  previousPage() {
    if(this.patientAppointments.pagination.hasPreviousPage){
      this.pageIndex--;
      this.getPatientAppointments();
    }
  }

  getPatientDetail(): void {
    // URL'den hasta ID'sini al
    const patientId = this.route.snapshot.paramMap.get('id');

    if (patientId) {
      this.http
        .get<PatientModel>(`Patient/GetPatientById?Id=${patientId}`)
        .subscribe((res) => {
          this.patient = res;
          const formattedDate = this.formatDate(res.birthDate.toString());
          this.patientEditForm.patchValue({ ...res, birthDate: formattedDate });
          this.patientService.setUser(res);
        });
    } else {
      console.error('Hasta ID bulunamadı');
      // Hata durumunu ele alın, örneğin kullanıcıyı başka bir sayfaya yönlendirin
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDate()
    ).slice(-2)}`;
  }

  getCurrentAge(endDate: Date): number {
    const diffInMs = Math.abs(
      new Date().getTime() - new Date(endDate).getTime()
    );
    const msInYear = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor(diffInMs / msInYear);
  }

  createPatientEditForm(): void {
    this.patientEditForm = this.formBuilder.group({
      id: [0],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          this.phoneNumberValidator(),
        ],
      ],
      birthDate: ['', [Validators.required]],
      bloodTypeId: ['', [Validators.required]],
    });
  }

  phoneNumberValidator(): ValidatorFn {
    const phoneNumberRegex = /^\+?\d{10,15}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = phoneNumberRegex.test(control.value);
      return valid
        ? null
        : {
            phoneNumber: {
              valid: false,
              message: "'Telefon Numarası' geçerli bir numara olmalıdır.",
            },
          };
    };
  }

  update(): void {
    if (this.patientEditForm.valid) {
      this.http
        .put('Patient/UpdatePatient', this.patientEditForm.value)
        .subscribe(() => {
          this.swal.callToast('Güncelleme işlemi başarılı!');
          this.getPatientDetail();
        });
    }
  }

  createPatientPasswordUpdateForm(): void {
    this.patientPasswordUpdateForm = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ match: true });
    } else {
      return null;
    }
  }

  updatePassword(): void {
    if (this.patientPasswordUpdateForm.valid) {
      this.http
        .put<any>('Auth/UpdatePassword', this.patientPasswordUpdateForm.value)
        .subscribe((res) => {
          this.swal.callToast(res.message);
          this.patientPasswordUpdateForm.reset();
        });
    }
  }

  getImages(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (this.validateFileType(file)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => this.addImage(reader.result as string, file);
      } else {
        console.error('Invalid file type: ', file.type);
      }
    }
  }

  validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    return allowedTypes.includes(file.type);
  }

  addImage(imageUrl: string, file: File): void {
    this.imageUrls.push({ imageUrl, name: file.name, size: file.size });
    this.image = file;
    this.isImageSelected = true;
  }

  removeImage(index: number): void {
    this.imageUrls.splice(index, 1);
    if (this.imageUrls.length === 0) {
      this.image = null;
      this.isImageSelected = false;
    }
  }

  saveImage(): void {
    if (this.patientEditForm.valid) {
      const formData: FormData = new FormData();
      const patientId = this.route.snapshot.paramMap.get('id');
      formData.append('patientId', patientId);
      formData.append('file', this.image);
      this.http.post<any>('Patient/AddImage', formData).subscribe((res) => {
        this.swal.callToast(res.message);
        this.getPatientDetail();
      });
    }
  }


  // Getters for patientEditForm
  get firstName() {
    return this.patientEditForm.get('firstName');
  }
  get lastName() {
    return this.patientEditForm.get('lastName');
  }
  get email() {
    return this.patientEditForm.get('email');
  }
  get phoneNumber() {
    return this.patientEditForm.get('phoneNumber');
  }
  get birthDate() {
    return this.patientEditForm.get('birthDate');
  }
  get bloodType() {
    return this.patientEditForm.get('bloodTypeId');
  }

  // Getters for patientPasswordUpdateForm
  get password() {
    return this.patientPasswordUpdateForm.get('password');
  }
  get confirmPassword() {
    return this.patientPasswordUpdateForm.get('confirmPassword');
  }
  get oldPassword() {
    return this.patientPasswordUpdateForm.get('oldPassword');
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
    const maxPagesToShow = 5; // Sayfa numaralarının maksimum gösterileceği miktarı belirleyin
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