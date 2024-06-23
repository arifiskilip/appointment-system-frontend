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

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
  imports: [BlankComponent, SharedModule, ValidDirective],
})
export class PatientProfileComponent implements OnInit {
  patient: PatientModel;
  patientEditForm: FormGroup;
  patientPasswordUpdateForm: FormGroup;
  validationMessages: ValidationMessages = new ValidationMessages();
  constImageUrl: ImageUrl = new ImageUrl();
  activeTab: string = 'activity';
  image: File;
  imageUrls: { imageUrl: string; name: string; size: number }[] = [];
  isImageSelected = false;

  constructor(
    private authService: AuthService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private swal: SwalService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.getPatientDetail();
    this.createPatientEditForm();
    this.createPatientPasswordUpdateForm();
  }

  getApiUrl() {
    return 'https://localhost:7073/';
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getPatientDetail(): void {
    const userId = this.authService.isAuthenticatedByUserId;
    this.http
      .get<PatientModel>(`Patient/GetPatientById?Id=${userId}`)
      .subscribe((res) => {
        this.patient = res;
        const formattedDate = this.formatDate(res.birthDate.toString());
        this.patientEditForm.patchValue({ ...res, birthDate: formattedDate });
        this.patientService.setUser(res);
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
      const patientId = this.authService.isAuthenticatedByUserId.toString();
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
}
