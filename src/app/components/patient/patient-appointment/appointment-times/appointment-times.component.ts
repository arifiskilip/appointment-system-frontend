import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { BlankComponent } from "../../../blank/blank.component";
import { SwalService } from '../../../../services/swal.service';
import { title } from 'process';

@Component({
    selector: 'app-appointment-times',
    standalone: true,
    templateUrl: './appointment-times.component.html',
    styleUrl: './appointment-times.component.scss',
    imports: [SharedModule, BlankComponent]
})
export class AppointmentTimesComponent {


  constructor(private swal:SwalService) {
    
  }


  submit(){
    this.swal.callSwal("Bilgi","ÖNEMLİ Randevunuzu kaydettiğinizde, onay işleminizi 07.06.2024 20:00 ile 09.06.2024 20:00 arasında www.mhrs.gov.tr, mobil uygulama veya ALO 182 Çağrı Merkezi üzerinden yapabilirsiniz. Onaylanmayan randevular otomatik olarak iptal edilmiş sayılır (RND6140).",()=>{

    },"Onayla","info");
  }

}
