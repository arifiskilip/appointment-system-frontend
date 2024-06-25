import { Component, OnInit } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";
import { SharedModule } from '../../../../common/shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClinicService } from '../../../../services/clinic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import { BranchModel } from '../../../../models/branchModel';
import { BranchListModel } from '../../../../models/branchListModel';
import { DoctorModel } from '../../../../models/doctorModel';

@Component({
    selector: 'app-search-appointment',
    standalone: true,
    templateUrl: './search-appointment.component.html',
    styleUrl: './search-appointment.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class SearchAppointmentComponent implements OnInit {
    searchForm: FormGroup;
    clinics:BranchModel[];
    doctors:DoctorModel[];
    minDate:string;

    constructor(private formBuilder: FormBuilder, private clinicService: ClinicService,
      private router:Router, private route:ActivatedRoute,private http:HttpService
    ) {
      this.searchForm = this.formBuilder.group({
        clinic: ['', Validators.required],
        doctor: [''],
        startDate: [''],
        endDate: ['']
      });

      const today = new Date();
      this.minDate = today.toISOString().split('T')[0];
    }
  
    ngOnInit(): void {
      this.getBranches();
    }
    
    getBranches(){
      this.http.get<BranchListModel>("Branch/GetAll").subscribe(res=>{
        this.clinics = res.branches
      })
    }

    getDoctors(){
        let clinicId = this.searchForm.get("clinic").value;
        this.http.get<DoctorModel[]>(`Doctor/GetAllByBranchId?BranchId=${clinicId}`).subscribe(res=>{
          this.doctors = res
        })
    }
    onSubmit() {
      if (this.searchForm.valid) {
        const queryParams = {
          clinicId: this.searchForm.get('clinic').value || '',
          doctorId: this.searchForm.get('doctor').value || '',
          startDate: this.searchForm.get('startDate').value || '',
          endDate: this.searchForm.get('endDate').value || '',
          page: 'list'
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