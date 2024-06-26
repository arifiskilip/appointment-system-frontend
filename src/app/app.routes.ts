import { PatientAppointmentListComponent } from './components/patient/patient-appointment-list/patient-appointment-list.component';
import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';

import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdminDoctorComponent } from './components/admin/admin-doctor/admin-doctor.component';
import { AdminBranchComponent } from './components/admin/admin-branch/admin-branch.component';
import { AdminTitleComponent } from './components/admin/admin-title/admin-title.component';
import { AdminPatientComponent } from './components/admin/admin-patient/admin-patient.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { DoctorDashboardComponent } from './components/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import { DoctorScheduleComponent } from './components/doctor/doctor-schedule/doctor-schedule.component';
import { DoctorTestComponent } from './components/doctor/doctor-test/doctor-test.component';
import { PatientAppointmentComponent } from './components/patient/patient-appointment/patient-appointment.component';
import { VerificationCodeComponent } from './components/home/verification-code/verification-code.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PatientProfileComponent } from './components/patient/patient-profile/patient-profile.component';
import { AdminFeedbackComponent } from './components/admin/admin-feedback/admin-feedback.component';
import { AppointmentDetailsComponent } from './components/patient/patient-appointment/appointment-details/appointment-details.component';
import { AdminPatientDetailsComponent } from './components/admin/admin-patient-details/admin-patient-details.component';
import { PatientDashboardComponent } from './components/patient/patient-dashboard/patient-dashboard.component';
import { PatientReportsComponent } from './components/patient/patient-reports/patient-reports.component';
import { UnauthorizedComponent } from './components/home/unauthorized/unauthorized.component';
import { map } from 'rxjs';
import { RoleGuard } from './guards/role.guard';
import { DoctorAppointmentsComponent } from './components/doctor/doctor-appointments/doctor-appointments.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verificationcode',
    component: VerificationCodeComponent,
    canActivate: [()=> inject(AuthService).isUserVerified()],
    data: { roles: 'Patient' }
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [()=> inject(AuthService).isAuthenticated(),RoleGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'profile',
        component: AdminProfileComponent,
      },
      {
        path: 'doctor',
        component: AdminDoctorComponent,
      },
      {
        path: 'branch',
        component: AdminBranchComponent,
      },
      {
        path: 'title',
        component: AdminTitleComponent,
      },
      {
        path: 'patient',
        component: AdminPatientComponent,
      },
      {
        path: 'feedback',
        component: AdminFeedbackComponent,
      },
      {
        path: 'patient-details/:id',
        component: AdminPatientDetailsComponent,
      },
    ],
  },
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    canActivate: [()=> inject(AuthService).isAuthenticated(),RoleGuard],
    data: { roles: ['Doctor'] },
    children: [
      {
        path: '',
        component: DoctorDashboardComponent
      },
      {
        path: 'profile',
        component: DoctorProfileComponent
      },
      {
        path: 'schedule',
        component: DoctorScheduleComponent
      },
      {
        path: 'test',
        component: DoctorTestComponent
      },
      {
        path:"appointments",
        component:DoctorAppointmentsComponent
      }
    ],
  },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    canActivate: [()=>inject(AuthService).isAuthenticated(),()=>inject(AuthService).isUserVerified(),RoleGuard],
    data: { roles: ['Patient'] },
    children: [
      {
        path: '',
        component: PatientDashboardComponent
      },
     {
      path:'appointment',
      component:PatientAppointmentComponent
     },
     {
      path:'profile',
      component:PatientProfileComponent
     },
     {
      path:'appointment-list',
      component:PatientAppointmentListComponent
     },
     {
      path:'reports',
      component:PatientReportsComponent
     }
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
