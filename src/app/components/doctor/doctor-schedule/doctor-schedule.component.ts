import  trLocale  from '@fullcalendar/core/locales/tr';
import interactionPlugin  from '@fullcalendar/interaction';
import  dayGridPlugin  from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BlankComponent } from "../../blank/blank.component";
import { CalendarOptions } from '@fullcalendar/core';
import { AppointmentIntervalModel } from '../../../models/appointmentIntervalModel';
import { HttpService } from '../../../services/http.service';
import { map, take } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../../../services/swal.service';
declare var $: any;

@Component({
    selector: 'app-doctor-schedule',
    standalone: true,
    templateUrl: './doctor-schedule.component.html',
    styleUrl: './doctor-schedule.component.scss',
    imports: [SharedModule, BlankComponent,FullCalendarModule]
})
export class DoctorScheduleComponent implements OnInit{

  constructor(private http:HttpService,private fb: FormBuilder,private swal:SwalService) { }

  ngOnInit(): void {
    this.initializeCalendarOptions();
    this.getAppointmentIntervals();
    this.createAppointmentAddForm();
    this.createAppointmentUpdateForm();
  }

  appointmentIntervals:AppointmentIntervalModel[]=[];
  calendarOptions: CalendarOptions;
  selectedEvent: any;
  appointmentAddForm:FormGroup;
  appointmentUpdateForm:FormGroup;
  minDate:string = new Date().toISOString().split('T')[0];
  minDateTime:string = new Date().toISOString().slice(0,16);
  getAppointmentIntervals(){
    this.http.get<AppointmentIntervalModel[]>("AppointmentInterval/GetAppoitmentIntervalsByDoctor")
    .pipe(take(1))
    .subscribe(
      res => {
        this.appointmentIntervals = res;
        this.initializeCalendarOptions();
      }
    );
  }
  initializeCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: trLocale,
      events: this.appointmentIntervals.map(interval => ({
        id:interval.id.toString(),
        title: interval.appointmentStatusName === 'Available' ? 'Boş' :
        interval.appointmentStatusName === 'Created' ? 'Dolu' :
        interval.appointmentStatusName === 'Completed' ? 'Tamamlandı' :
        'İptal Edildi',
        start: interval.intervalDate,
        color:  interval.appointmentStatusName === 'Available' ? 'green' :
        interval.appointmentStatusName === 'Created' ? 'red' :
        interval.appointmentStatusName === 'Completed' ? 'yellow' :
        'gray'
      })),
      eventClick: this.handleEventClick.bind(this) // add eventClick callback
    };
  }
  handleEventClick(arg:any) {
    this.selectedEvent = arg.event;
    if(this.selectedEvent.start>Date.now() && this.selectedEvent.title==='Boş'){
      this.appointmentUpdateForm.patchValue({appointmentIntervalId:arg.event.id,intervalDate:this.formatDate(arg.event.start)})
      $('#eventModal').modal('show');
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  createAppointmentAddForm(){
    this.appointmentAddForm = this.fb.group({
      day: ['', [Validators.required, this.dateValidator]],
      startTime: ['', [Validators.required, this.timeValidator]],
      endTime: ['', [Validators.required, this.timeValidator]],
      patientInterval: ['', [Validators.required, Validators.min(1), Validators.max(60)]]
    }, { validator: this.timeRangeValidator });
  }

  createAppointmentUpdateForm(){
    this.appointmentUpdateForm = this.fb.group({
      appointmentIntervalId:[0],
      intervalDate: ['', [Validators.required, this.dateTimeValidator]],
    })
  }
  // Özel bir zaman doğrulayıcı fonksiyon
  timeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!control.value.match(timePattern)) {
      return { invalidTime: true };
    }
    return null;
  }

  // Özel bir tarih doğrulayıcı fonksiyon
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    const selectedDate = new Date(control.value);
     // Bugün tarihini yalnızca yıl, ay ve gün olarak karşılaştırıyoruz
     today.setHours(0, 0, 0, 0);
     selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return { invalidDate: true };
    }
    return null;
  }
  dateTimeValidator(control: AbstractControl): {[key: string]: any} | null {
    const inputDate = new Date(control.value);
    const now = new Date();

    // Aynı gün ise, saat kontrolü yap
    if (inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getDate() === now.getDate() &&
        inputDate.getTime() < now.getTime()) {
      return { 'invalidDate': true };
    }

    // Geçmiş tarih ise
    if (inputDate < now) {
      return { 'invalidDate': true };
    }

    return null;
  }

  // Başlangıç ve bitiş saatleri arasındaki ilişkiyi doğrulayan fonksiyon
  timeRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const startTime = group.controls.startTime.value;
    const endTime = group.controls.endTime.value;
    if (startTime && endTime && startTime >= endTime) {
      return { invalidTimeRange: true };
    }
    return null;
  }

  // Formu submit ederken çalışacak fonksiyon
  addSchedule(): void {
    if (this.appointmentAddForm.valid) {
      this.http.post<any>("DoctorSchedule/Add",this.appointmentAddForm.value).subscribe(res=>{
        this.swal.callToast("Ekleme işlemi başarılı.","success");
        this.getAppointmentIntervals();
      })
    }
  }

  updateAppointmetnInterval(){
    if(this.appointmentUpdateForm.valid){
      this.swal.callSwal("Mevcut randevu güncellenecektir","Randevuyu güncellemek istediğinizden emin misiniz?",
        ()=>{
          this.http.post('AppointmentInterval/UpdateDate',this.appointmentUpdateForm.value)
          .pipe(take(1))
          .subscribe(res=>{
            this.swal.callToast("Güncelleme işlemi başarılı.");
            this.getAppointmentIntervals();
          })
          $('#eventModal').modal('hide');
        },"Güncelle"
      )
    }
  }

  deleteAppointmentInterval(intervalId:number){
    this.swal.callSwal("Mevcut randevu silinecektir","Randevuyu silmek istediğinizden emin misiniz?",
      ()=>{
        this.http.delete('AppointmentInterval/DeleteInterval?AppointmentIntervalId='+intervalId)
        .pipe(take(1))
        .subscribe(res=>{
          this.swal.callToast("Silme işlemi başarılı.");
          this.getAppointmentIntervals();
        })
        $('#eventModal').modal('hide');
      },"Sil"
    )
  }
}
