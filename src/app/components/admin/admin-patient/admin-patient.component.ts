import { PatientService } from './../../../services/patient.service';
import { AuthService } from './../../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PatientModel } from '../../../models/patientModel';
import { HttpService } from '../../../services/http.service';
import { SwalService } from '../../../services/swal.service';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { SharedModule } from '../../../common/shared/shared.module';
import { ValidDirective } from '../../../common/directives/valid.directive';
declare var $: any;


@Component({
    selector: 'app-admin-patient',
    standalone: true,
    templateUrl: './admin-patient.component.html',
    styleUrl: './admin-patient.component.scss',
    imports: [BlankComponent, SharedModule, ValidDirective]
})
export class AdminPatientComponent implements OnInit{
  @Input() id?: number;

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
    this.getPatientDetail();
    this.createPatientEditForm();
    this.createPatientEditForm();
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
          this.getPatientDetail();
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

  onButtonClick() {
    this.router.navigate([`/admin/patient-details/${this.id}`])
  }

  doctorSchedule = {
    day: '',
    startTime: '',
    endTime: '',
    patientInterval: ''
  };

  schedules = [
    {
      id: 1,
      day: '2024-06-05',
      startTime: '09:00',
      endTime: '12:00',
      patientInterval: 30
    },
    {
      id: 2,
      day: '2024-06-06',
      startTime: '13:00',
      endTime: '17:00',
      patientInterval: 20
    }
  ];
  selectedSchedule: any;

  loadSchedules() {

  }

  editSchedule(schedule:any) {
    this.selectedSchedule = { ...schedule };
    $('#editScheduleModal').modal('show');
  }

  onEditSubmit() {

      $('#editScheduleModal').modal('hide');
  }

  deleteSchedule() {
      this.loadSchedules();
  }
}
