import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { SwalService } from '../../../services/swal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { LoginResponseModel } from '../../../models/loginResponseModel';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ValidDirective } from '../../../common/directives/valid.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, ValidDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpService,
    private router: Router,
    private swal: SwalService,
    private formBuilder: FormBuilder,
    private readonly localStorage:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createForgotPasswordForm();
    this.createVerificationCodeForm();
  }

  loginForm: FormGroup;
  forgotPassworForm: FormGroup;
  validationMessages: ValidationMessages = new ValidationMessages();

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  get forgotPasswordEmail(){
    return this.forgotPassworForm.get("email");
  }
  createForgotPasswordForm() {
    this.forgotPassworForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  signIn() {
    this.http
      .post<LoginResponseModel>('Auth/Login', this.loginForm.value)
      .subscribe((res) => {
        this.localStorage.setItem('token', res.accessToken.token);
        this.swal.callToast('Giriş işlemi başarılı.');
        this.router.navigateByUrl('/patient');
      });
  }

  verificaionCodeForm:FormGroup;
  verificationCodePage:boolean=false;
  get VerificationCode() {
    return this.verificaionCodeForm.get("verificationCode");
  }
  createVerificationCodeForm(){
    this.verificaionCodeForm = this.formBuilder.group({
      verificationCode:["",Validators.required]
    })
  }

  sendVerificationCode() {
    this.verificationCodePage = true;
  }

  change(){
    this.verificationCodePage = false;
  }
}
