import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { ValidDirective } from '../../../common/directives/valid.directive';
import { HttpService } from '../../../services/http.service';
import { SwalService } from '../../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, ValidDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    this.createRegisterForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private swal: SwalService,
    private router: Router
  ) {}

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

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get bloodType() {
    return this.registerForm.get('bloodTypeId');
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
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        bloodTypeId: ['', [Validators.required]],
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
        birthDate:['',Validators.required]
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

  register() {
    if (this.registerForm.valid) {
      this.http
        .post('auth/patientregister', this.registerForm.value)
        .subscribe((res) => {
          this.swal.callToast('Kayıt işlemi başarılı!');
          this.router.navigateByUrl('login');
        });
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
}
