import { Component } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";

@Component({
    selector: 'app-admin-patient',
    standalone: true,
    templateUrl: './admin-patient.component.html',
    styleUrl: './admin-patient.component.scss',
    imports: [BlankComponent]
})
export class AdminPatientComponent {

}
