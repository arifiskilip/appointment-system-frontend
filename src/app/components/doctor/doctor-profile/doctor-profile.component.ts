import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ImageUrl } from '../../../common/constants/imageUrl';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { Paginate } from '../../../models/paginateModel';
import { PatientAppointmentsModel } from '../../../models/patientAppointmentsModel';
import { AuthService } from '../../../services/auth.service';
import { SwalService } from '../../../services/swal.service';
import { SharedModule } from '../../../common/shared/shared.module';
import { ValidDirective } from '../../../common/directives/valid.directive';
import { DoctorModel } from '../../../models/doctorModel';
import { DoctorAppointmentsModel } from '../../../models/doctorAppointmentsModel';
import { DoctorService } from '../../../services/doctor.service';
import { HttpService } from '../../../services/http.service';

@Component({
    selector: 'app-doctor-profile',
    standalone: true,
    templateUrl: './doctor-profile.component.html',
    styleUrl: './doctor-profile.component.scss',
    imports: [BlankComponent,SharedModule,ValidDirective]
})
export class DoctorProfileComponent implements OnInit {
  doctor: DoctorModel;
  doctorAppointments: Paginate<DoctorAppointmentsModel[]>;
  pageIndex: number = 1;
  pageSize: number = 10;
  doctorEditForm: FormGroup;
  doctortPasswordUpdateForm: FormGroup;
  validationMessages: ValidationMessages = new ValidationMessages();
  constImageUrl: ImageUrl = new ImageUrl();
  activeTab: string = 'timeline';
  image: File;
  imageUrls: { imageUrl: string; name: string; size: number }[] = [];
  isImageSelected = false;

  constructor(
    private authService: AuthService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private swal: SwalService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.getDoctorDetail();
    this.createDoctorEditForm();
    this.createDoctorPasswordUpdateForm();
    this.getDoctorAppointments();
  }

  getApiUrl() {
    return 'https://localhost:7073/';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  groupedAppointments: { [key: string]: PatientAppointmentsModel[] } = {};
  getDoctorAppointments() {
    this.http
      .get<any>(
        `Appointment/GetPaginatedDoctorAppointments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
      )
      .subscribe((res) => {
        this.doctorAppointments = res.doctorAppointments;
        this.doctorAppointments.items.forEach((appointment) => {
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
  }

  getDates(): string[] {
    return Object.keys(this.groupedAppointments);
  }

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

  nextPage() {
    if(this.doctorAppointments.pagination.hasNextPage){
      this.pageIndex++;
      this.groupedAppointments={};
      this.getDoctorAppointments();
    }
  }

  previousPage() {
    if(this.doctorAppointments.pagination.hasPreviousPage){
      this.pageIndex--;
      this.groupedAppointments={};
      this.getDoctorAppointments();
    }
  }
  getDoctorDetail(): void {
    const userId = this.authService.isAuthenticatedByUserId;
    this.http
      .get<DoctorModel>(`Doctor/GetByIdDoctor?Id=${userId}`)
      .subscribe((res) => {
        this.doctor = res;
        const formattedDate = this.formatDate(res.birthDate.toString());
        this.doctorEditForm.patchValue({ ...res, birthDate: formattedDate });
        this.doctorService.setUser(res);
      });
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

  createDoctorEditForm(): void {
    this.doctorEditForm = this.formBuilder.group({
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
      birthDate: ['', [Validators.required]]
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
    if (this.doctorEditForm.valid) {
      this.http
        .put('Doctor/UpdateDoctor', this.doctorEditForm.value)
        .subscribe(() => {
          this.swal.callToast('Güncelleme işlemi başarılı!');
          this.getDoctorDetail();
        });
    }
  }

  createDoctorPasswordUpdateForm(): void {
    this.doctortPasswordUpdateForm = this.formBuilder.group(
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
    if (this.doctortPasswordUpdateForm.valid) {
      this.http
        .put<any>('Auth/UpdatePassword', this.doctortPasswordUpdateForm.value)
        .subscribe((res) => {
          this.swal.callToast(res.message);
          this.doctortPasswordUpdateForm.reset();
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
    if (this.doctorEditForm.valid) {
      const formData: FormData = new FormData();
      const patientId = this.authService.isAuthenticatedByUserId.toString();
      formData.append('doctorId', patientId);
      formData.append('file', this.image);
      this.http.post<any>('Doctor/AddImage', formData).subscribe((res) => {
        this.swal.callToast(res.message);
        this.getDoctorDetail();
      });
    }
  }

  // Getters for patientEditForm
  get firstName() {
    return this.doctorEditForm.get('firstName');
  }
  get lastName() {
    return this.doctorEditForm.get('lastName');
  }
  get email() {
    return this.doctorEditForm.get('email');
  }
  get phoneNumber() {
    return this.doctorEditForm.get('phoneNumber');
  }
  get birthDate() {
    return this.doctorEditForm.get('birthDate');
  }

  // Getters for patientPasswordUpdateForm
  get password() {
    return this.doctortPasswordUpdateForm.get('password');
  }
  get confirmPassword() {
    return this.doctortPasswordUpdateForm.get('confirmPassword');
  }
  get oldPassword() {
    return this.doctortPasswordUpdateForm.get('oldPassword');
  }

}
