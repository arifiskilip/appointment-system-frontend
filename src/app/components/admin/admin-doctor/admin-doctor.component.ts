import { Component, Input, OnInit } from '@angular/core';
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
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { ValidDirective } from '../../../common/directives/valid.directive';
import { register } from 'module';
declare var $:any; 
@Component({
    selector: 'app-admin-doctor',
    standalone: true,
    templateUrl: './admin-doctor.component.html',
    styleUrl: './admin-doctor.component.scss',
    imports: [BlankComponent,SharedModule,ValidDirective]
})
export class AdminDoctorComponent implements OnInit{
    ngOnInit(): void {
        this.getDoctors(this.doctorQuery);
        this.getBranches();
        this.getTitles();
        this.createDoctorUpdateForm();
        this.createRegisterForm();
    }

    constructor(private http:HttpService, private swal:SwalService, private fb:FormBuilder) {
        
    }


    titleId:number=0;
    branchId:number=0;
    search:string='';
    branches:BranchModel[];
    titles:TitleModel[];
    doctorUpdateForm:FormGroup;
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
            this.totalPages = this.doctors.pagination.totalPages;
        })
    }
    getBranches(){
        this.http.get<any>(`Branch/GetAll`)
        .pipe(take(1))
        .subscribe(res=>{
            this.branches = res.branches;
        })
    }
    createDoctorUpdateForm(){
      this.doctorUpdateForm = this.fb.group({
        id:[''],
        firstName: ['', [Validators.required,Validators.minLength(3),
          Validators.maxLength(50)]],
        lastName: ['', [Validators.required,Validators.minLength(3),
          Validators.maxLength(50)]],
        email:[''],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        birthDate: ['', Validators.required],
        titleId: ['',Validators.required],
        branchId: ['',Validators.required]
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
    setDoctor(doctorId:number){
      this.http.get<DoctorModel>('Doctor/GetByIdDoctor?Id='+doctorId)
      .pipe(take(1))
      .subscribe(res=>{
        const formattedDate = this.formatDate(res.birthDate.toString());
        this.doctorUpdateForm.patchValue({...res,birthDate: formattedDate})
      })
    }
    formatDate(date: string): string {
      const d = new Date(date);
      return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
        '0' + d.getDate()
      ).slice(-2)}`;
    }
    update(): void {
      if (this.doctorUpdateForm.valid) {
        this.http
          .put('Doctor/UpdateDoctor', this.doctorUpdateForm.value)
          .subscribe(() => {
            this.swal.callToast('Güncelleme işlemi başarılı!');
            this.getDoctors(this.doctorQuery);
          });
      }
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
      ,"Aktif Et");
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
    registerForm: FormGroup;
  validationMessages: ValidationMessages = new ValidationMessages();

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get getTitleId() {
    return this.registerForm.get('titleId');
  }

  get getBranchId() {
    return this.registerForm.get('branchId');
  }

  get gender() {
    return this.registerForm.get('genderId');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get identityNumber() {
    return this.registerForm.get('identityNumber');
  }
  get birthDate() {
    return this.registerForm.get('birthDate');
  }
  createRegisterForm() {
    this.registerForm = this.fb.group(
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
        titleId: ['', Validators.required],
      branchId: ['', Validators.required],
      }
    );
  }

  doctorRegister() {
    if (this.registerForm.valid) {
     this.http.post<any>('Auth/DoctorRegister',this.registerForm.value)
     .pipe(take(1))
     .subscribe(res=>{
      this.swal.callToast("Ekleme işlemi başarılı.");
      this.getDoctors(this.doctorQuery);
     })
    }
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
