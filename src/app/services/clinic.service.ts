import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor() { }

  private clinics = [
    { id: 1, name: 'Alabama' },
    { id: 2, name: 'Alaska' },
    { id: 3, name: 'California' },
    { id: 4, name: 'Delaware' },
    { id: 5, name: 'Tennessee' },
    { id: 6, name: 'Texas' },
    { id: 7, name: 'Washington' }
  ];

  private doctors = [
    { id: 1, clinicId: 1, name: 'Hekim 1 - Alabama' },
    { id: 2, clinicId: 1, name: 'Hekim 2 - Alabama' },
    { id: 3, clinicId: 2, name: 'Hekim 1 - Alaska' },
    { id: 4, clinicId: 3, name: 'Hekim 1 - California' },
    { id: 5, clinicId: 3, name: 'Hekim 2 - California' },
    { id: 6, clinicId: 4, name: 'Hekim 1 - Delaware' },
    { id: 7, clinicId: 5, name: 'Hekim 1 - Tennessee' },
    { id: 8, clinicId: 6, name: 'Hekim 1 - Texas' },
    { id: 9, clinicId: 7, name: 'Hekim 1 - Washington' }
  ];

  getClinics() {
    return this.clinics;
  }

  getDoctorsByClinic(clinicId: number) {
    return this.doctors.filter(doctor => doctor.clinicId === clinicId);
  }
}
