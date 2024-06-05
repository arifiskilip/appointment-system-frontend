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

export const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path: '',
    component:HomePageComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
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
    ],
  },
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    children: [
      {
        path:"",
        component:DoctorDashboardComponent
      },
      {
        path:"profile",
        component:DoctorProfileComponent
      },
      {
        path:"schedule",
        component:DoctorScheduleComponent
      },
      {
        path:"test",
        component:DoctorTestComponent
      }
    ],
  },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    children: [
      // Patient routes go here
    ],
  },
  // {
  //   path: '',
  //   redirectTo: '/admin',
  //   pathMatch: 'full',
  // },
];
