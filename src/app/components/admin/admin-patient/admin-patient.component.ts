import { PatientService } from './../../../services/patient.service';
import { AuthService } from './../../../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PatientModel } from '../../../models/patientModel';
import { HttpService } from '../../../services/http.service';
import { SwalService } from '../../../services/swal.service';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { SharedModule } from '../../../common/shared/shared.module';
import { ValidDirective } from '../../../common/directives/valid.directive';
import { Paginate } from '../../../models/paginateModel';
import { ImageUrl } from '../../../common/constants/imageUrl';
declare var $: any;


@Component({
    selector: 'app-admin-patient',
    standalone: true,
    templateUrl: './admin-patient.component.html',
    styleUrl: './admin-patient.component.scss',
    imports: [BlankComponent, SharedModule, ValidDirective]
})
export class AdminPatientComponent implements OnInit{

  @ViewChild('updateEditModal') updateEditModal: ElementRef;
  patients:Paginate<PatientModel[]>;
  imageUrl:ImageUrl = new ImageUrl();
  patientEditForm: FormGroup;
  patient: PatientModel;
  validationMessages: ValidationMessages = new ValidationMessages();

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private swal: SwalService,
    private patientService: PatientService

  ) {}

  ngOnInit(): void {
    this.createPatientEditForm();
    this.getPatients();
  }

  getPatientDetail(userId: number): void {
    this.http
      .get<PatientModel>(`Patient/GetPatientById?Id=${userId}`)
      .subscribe((res) => {
        this.patient = res;
        const formattedDate = this.formatDate(res.birthDate.toString());
        this.patientEditForm.patchValue({ ...res, birthDate: formattedDate });
      });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDate()
    ).slice(-2)}`;
  }

  getApiUrl() {
    return 'https://localhost:7073/';
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
          this.getPatientDetail(this.patientEditForm.value.id);
          // $('#updateModalLabel').modal('hide'); // Modal'ı kapat
          this.getPatients(); // Hastalar listesini güncelle
        });
    }
  }

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
