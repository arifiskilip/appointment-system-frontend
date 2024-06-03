import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';

import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdminDoctorComponent } from './components/admin/admin-doctor/admin-doctor.component';

export const routes: Routes = [
    {
      path: 'admin',
      component: AdminLayoutComponent,
      children: [
        {
            path: '',
            component:AdminDashboardComponent
          },
          {
            path: 'profile',
           component:AdminProfileComponent
          },
          {
            path: 'doctor',
           component:AdminDoctorComponent
         }
      ]
    },
    {
      path: 'doctor',
      component: DoctorLayoutComponent,
      children: [
        // Admin routes go here
      ]
    },
    {
      path: 'patient',
      component: PatientLayoutComponent,
      children: [
        // Patient routes go here
      ]
    },
    {
      path: '',
      redirectTo:'/admin',
      pathMatch: 'full'
    }
  ];
