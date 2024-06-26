import { PatientModel } from './../../../models/patientModel';
import { AppointmentsForCurrentDay } from './../../../models/appointmentsForCurrentDay';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import trLocale from '@fullcalendar/core/locales/tr'; // Türkçe yerelleştirme dosyasını import edin
import { BlankComponent } from '../../blank/blank.component';
import { SharedModule } from '../../../common/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { take } from 'rxjs';
import { SwalService } from '../../../services/swal.service';

declare var $: any;

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [BlankComponent,SharedModule,FullCalendarModule],
  templateUrl: './doctor-appointments.component.html',
  styleUrl: './doctor-appointments.component.scss'
})
export class DoctorAppointmentsComponent implements OnInit{
  reportForm:FormGroup;
  constructor(private fb:FormBuilder, private http:HttpService, private swal:SwalService) {
  }
  ngOnInit(): void {
    this.initializeCalendarOptions();
    this.getAppointmentsForCurrentDay();
    this.reportForm = this.fb.group({
      appointmentId: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],
      file: ['']
    });
  }

  tab: 'Created' | 'Canceled' | 'Completed' = 'Created';
  today = new Date();

  appointments: AppointmentsForCurrentDay[]=[];

  getAppointmentsForCurrentDay(){
    this.http.get<AppointmentsForCurrentDay[]>('Appointment/GetAppointmentsForCurrentDayByDoctor')
    .pipe(take(1))
    .subscribe(res=>{
      this.appointments = res
      this.initializeCalendarOptions();
    })
  }
  
  get filteredAppointments() {
    const todayStart = new Date(this.today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(this.today.setHours(23, 59, 59, 999));
    return this.appointments.filter(appointment => {
      if (this.tab === 'Created') {
        return appointment.appointmentStatusName ==='Created'
      } else if (this.tab === 'Completed') {
        return appointment.appointmentStatusName ==='Completed'
      } else if (this.tab === 'Canceled') {
       return appointment.appointmentStatusName ==='Canceled'
      }
      return false;
    });
  }

  getAppointmentStatusName(appointmentStatusName:string){
    switch (appointmentStatusName) {
      case 'Created':
        return 'Bekliyor'
     case 'Completed':
        return 'Onaylandı'
      default:
        return 'İptal Edildi'
    }
  }
  currentPatient:PatientModel;
  acceptAppointment(id: number, patientId:number) {
    this.swal.callSwal("Randevu Onaylanacaktır","Randevuyu onaylamak istediğinizden emin misiniz?",()=>{
      this.http.post<any>('Appointment/CompleteAppointmentByDoctor',{appointmentId:id})
      .pipe(take(1))
      .subscribe(res=>{
       this.getUserDetail(patientId)
        $('#addReportModal').modal('show');
        this.initializeCalendarOptions();
        this.getAppointmentsForCurrentDay();
        this.swal.callToast("Randevu onaylandı.");
      })
    },"Onayla")
  }
  closeModal(){
    this.reportForm.reset();
    $('#addReportModal').modal('hide');
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

  getUserDetail(patientId:number){
    this.http.get<PatientModel>('Patient/GetPatientById?Id='+patientId)
    .pipe(take(1))
    .subscribe(res=>{
      this.currentPatient = res;
    })
  }
  rejectAppointment(id: number) {
    this.swal.callSwal("Randevu İptal Edilecektir","Randevuyu iptal etmek istediğinizden emin misiniz?",()=>{
      this.http.post<any>('Appointment/CancelAppointmentByDoctor',{appointmentId:id})
      .pipe(take(1))
      .subscribe(res=>{
        $('#addReportModal').modal('show');
        this.initializeCalendarOptions();
        this.getAppointmentsForCurrentDay();
        this.swal.callToast("Randevu iptal edildi.");
      })
    },"İptal Et")
  }

  waitedAppointment(id: number) {
    this.swal.callSwal("Randevu İptal Edilecektir","Randevuyu iptal etmek istediğinizden emin misiniz?",()=>{
      this.http.post<any>('Appointment/AvailableAppointmentByDoctor',{appointmentId:id})
      .pipe(take(1))
      .subscribe(res=>{
        $('#addReportModal').modal('show');
        this.initializeCalendarOptions();
        this.getAppointmentsForCurrentDay();
        this.swal.callToast("Randevu beklemeye alındı.");
      })
    },"Beklemeye Al")
  }

  setTab(tab: 'Created' | 'Completed' | 'Canceled') {
    this.tab = tab;
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.reportForm.patchValue({
        file: file
      });
    }
  }
  get f() {
    return this.reportForm.controls;
  }
  calendarOptions: CalendarOptions;
  initializeCalendarOptions(){
    this.calendarOptions ={
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: trLocale,
      events: this.appointments.map(appointment=>({
        id:appointment.id.toString(),
        title:appointment.patientName,
        start: appointment.intervalDate,
        color: appointment.appointmentStatusName === 'Completed' ? 'green' : appointment.appointmentStatusName === 'Canceled' ? 'red' : 'orange'
      }))
    }
  }

  patientInfo = {
    name: 'John Doe',
    surname: 'Doe',
    email: 'john.doe@example.com',
    idNumber: '12345678901',
    phoneNumber: '+1 234 567 890',
    bloodType: 'O+',
    image: 'https://avatars.githubusercontent.com/u/71379630?v=4',
    age: 30,
    gender: 'Male'
  };

  open(content: any) {
    $('#addReportModal').modal('show');
  }

  onSubmit() {
    if (this.reportForm.valid) {
      // Handle form submission
      console.log(this.reportForm.value);
    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }
}

interface Appointment {
  id: number;
  patientName: string;
  time: string;
  date: Date;
  status: 'accepted' | 'rejected' | 'pending';
}