import { Component } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";

@Component({
    selector: 'app-admin-doctor',
    standalone: true,
    templateUrl: './admin-doctor.component.html',
    styleUrl: './admin-doctor.component.scss',
    imports: [BlankComponent]
})
export class AdminDoctorComponent {

}
