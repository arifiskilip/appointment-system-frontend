import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";
import { SharedModule } from '../../../../common/shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClinicService } from '../../../../services/clinic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search-appointment',
    standalone: true,
    templateUrl: './search-appointment.component.html',
    styleUrl: './search-appointment.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class SearchAppointmentComponent implements OnInit {
    searchForm: FormGroup;
    clinics:any = [];
    doctors:any = [];
  
    constructor(private formBuilder: FormBuilder, private clinicService: ClinicService,
      private router:Router, private route:ActivatedRoute
    ) {
      this.searchForm = this.formBuilder.group({
        clinic: ['', Validators.required],
        doctor: [''],
        startDate: [''],
        endDate: ['']
      });
    }
  
    ngOnInit(): void {
      this.clinics = this.clinicService.getClinics();
    }
    
    getDoctors(){
        let clinicId = this.searchForm.get("clinic").value;
        this.doctors = this.clinicService.getDoctorsByClinic(Number.parseInt(clinicId))
    }
    onSubmit() {
      console.log(this.searchForm.value)
      if (this.searchForm.valid) {
        const queryParams = {
          clinicId:this.searchForm.get('clinic').value,
          doctorId:this.searchForm.get('doctor').value,
          startDate:this.searchForm.get('startDate').value,
          endDate:this.searchForm.get('endDate').value,
          page:'list'
        };
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: queryParams,
          queryParamsHandling: 'merge' // mevcut query parametrelerini korur
        });
      }
    }
  
    onReset() {
      this.searchForm.reset();
      this.doctors = [];
}
}