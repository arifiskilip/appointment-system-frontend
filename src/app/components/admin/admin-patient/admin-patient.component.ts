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
import { take } from 'rxjs';
import { BranchModel } from '../../../models/branchModel';
import { TitleModel } from '../../../models/titleModel';
import { PaginationComponent } from '../../home/pagination/pagination.component';
declare var $: any;


@Component({
    selector: 'app-admin-patient',
    standalone: true,
    templateUrl: './admin-patient.component.html',
    styleUrl: './admin-patient.component.scss',
    imports: [BlankComponent, SharedModule, ValidDirective, PaginationComponent]
})
export class AdminPatientComponent implements OnInit{

  @ViewChild('updateEditModal') updateEditModal: ElementRef;
  patients:Paginate<PatientModel[]>;
  patientEditForm: FormGroup;
  patient: PatientModel;
  validationMessages: ValidationMessages = new ValidationMessages();
  searchText:string="";
  getImage:ImageUrl = new ImageUrl();
  registerForm: FormGroup;
  branches:BranchModel[];
  titles:TitleModel[];
  titleId:number=0;
  branchId:number=0;


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
    this.createRegisterForm();
    this.getPatients();
  }

  getPatientDetail(userId: number): void {
    this.http
      .get<PatientModel>(`Patient/GetPatientById?Id=${userId}`)
      .pipe(take(1))
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
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get birthDate() {
    return this.registerForm.get('birthDate');
  }
  get bloodType() {
    return this.registerForm.get('bloodTypeId');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get gender() {
    return this.registerForm.get('genderId');
  }
  get identityNumber() {
    return this.registerForm.get('identityNumber');
  }

  get firstNameD() {
    return this.patientEditForm.get('firstName');
  }
  get lastNameD() {
    return this.patientEditForm.get('lastName');
  }
  get emailD() {
    return this.patientEditForm.get('email');
  }
  get phoneNumberD() {
    return this.patientEditForm.get('phoneNumber');
  }
  get birthDateD() {
    return this.patientEditForm.get('birthDate');
  }
  get bloodTypeD() {
    return this.patientEditForm.get('bloodTypeId');
  }

  pageSize: number = 10;
  pageIndex: number = 1;
  totalItems: number;
  totalPages: number;

  getPatients(){
    this.http
      .get<any>(
        `Patient/GetPatientsPaginated?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
      )
      .pipe(take(1))
      .subscribe((res) => {
        this.patients = res.patients;
        this.totalItems = res.patients.pagination.totalItems;
        this.totalPages = this.patients.pagination.totalPages;
        this.pageIndex = this.patients.pagination.pageIndex;
        console.log(this.totalItems, this.totalPages, this.pageIndex);
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


  confirmDelete(patient: PatientModel): void {
    const confirmation = window.confirm(`${patient.firstName} ${patient.lastName} isimli hastayı silmek istediğinize emin misiniz?`);
    if (confirmation) {
      this.changeIsDeletedPatient(patient.id);
    }
  }

  confirmActivate(patient: PatientModel): void {
    const confirmation = window.confirm(`${patient.firstName} ${patient.lastName} isimli hastayı aktif etmek istediğinize emin misiniz?`);
    if (confirmation) {
      this.changeIsDeletedPatient(patient.id);
    }
  }

  changeIsDeletedPatient(patientId: number) {
    if (patientId == null) {
      console.error('Patient ID is required');
      return;
    }

    this.http.post<any>(`Patient/DeletePatientByAdmin?PatientId=${patientId}`)
      .subscribe(
        () => {
          this.swal.callToast('Değişiklik gerçekleşti!');
          this.getPatients(); // Listeyi yenile
      });
  }

  searchPatient(){
    if(this.searchText.length>1){
      this.http
      .get<any>(
        `Patient/GetSearchPatients?SearchTerm=${this.searchText}&Index=${this.pageIndex}&Size=${this.pageSize}`
      )
      .pipe(take(1))
      .subscribe((res) => {
        this.patients = res.patients.items;
        this.totalItems = res.patients.pagination.totalItems;
      });
    }
    else{
      this.getPatients();
    }
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
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
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        phoneNumber: ['', [Validators.required, this.phoneNumberValidator()]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        isEmailVerified:[true],
        identityNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            this.identityNumberValidator(),
          ],
        ],
        genderId: ['', [Validators.required]],
        birthDate:['',Validators.required],
        bloodTypeId: ['', [Validators.required]],
      }
    );
  }

  patientRegister() {
    if (this.registerForm.valid) {
     this.http.post<any>('Auth/PatientRegister',this.registerForm.value)
     .pipe(take(1))
     .subscribe(res=>{
      this.swal.callToast("Ekleme işlemi başarılı.");
      this.getPatients();
      this.registerForm.reset();
     })
    }
  }

  identityNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const identityNumber = control.value;
      if (
        !identityNumber ||
        identityNumber.length !== 11 ||
        !/^\d{11}$/.test(identityNumber)
      ) {
        return {
          identityNumber: {
            valid: false,
            message: 'Geçersiz kimlik numarası.',
          },
        };
      }

      const digits = identityNumber.split('').map(Number);
      const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
      const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
      const checksum1 = (sumOdd * 7 - sumEven) % 10;
      const checksum2 =
        digits.slice(0, 10).reduce((a: any, b: any) => a + b, 0) % 10;

      if (digits[9] !== checksum1 || digits[10] !== checksum2) {
        return {
          identityNumber: {
            valid: false,
            message: 'Geçersiz kimlik numarası.',
          },
        };
      }

      return null;
    };
  }

  onPageChange(newpage: number) {
    this.pageIndex = newpage;
    this.getPatients();
    }

//   //Pagination
//   pageSize: number = 10;

//   // Mevcut sayfa numarası
//   pageIndex: number = 1;

//   // Toplam sayfa sayısı
//   totalPages: number;

//   totalItems: number;
//   // Sayfaya git
//   goToPage(page: number) {
//     if (page >= 1 && page <= this.totalPages) {
//       this.pageIndex = page;
//       this.getPatients();
//     }
//   }

//   // Önceki sayfaya git
//   prevPage() {
//     if (this.pageIndex > 1) {
//       this.pageIndex--;
//       this.getPatients();
//     }
//   }

//   // Sonraki sayfaya git
//   nextPage() {
//     if (this.pageIndex < this.totalPages) {
//       this.pageIndex++;
//       this.getPatients();
//     }
//     console.log(this.pageIndex);
//   }

//   // İlk sayfaya git
//   goToFirstPage() {

//       this.pageIndex = 1;
//       this.getPatients();

//     console.log(this.pageIndex);
//   }

//   // Son sayfaya git
//   goToLastPage() {

//       this.pageIndex = this.totalPages;
//       this.getPatients();

//   }

//   // Sayfa numaralarını döndürür
//   getPageNumbers(): number[] {
//     const pageNumbers = [];
//     const maxPagesToShow = 10; // Sayfa numaralarının maksimum gösterileceği miktarı belirleyin
//     const startPage = Math.max(
//       1,
//       this.pageIndex - Math.floor(maxPagesToShow / 2)
//     );
//     const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
//     return pageNumbers;
//   }

//   // Kaç adet listeleneceğini beliritir
//   goToChangeSelectedCount() {
//     this.getPatients();
//   }

//   // Başlangıç indisini hesaplar
//   calculateStartIndex(): number {
//     return (this.pageIndex - 1) * this.pageSize + 1;
//   }

}
