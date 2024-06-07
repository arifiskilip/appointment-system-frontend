import { Component } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";

@Component({
    selector: 'app-appointment-list',
    standalone: true,
    templateUrl: './appointment-list.component.html',
    styleUrl: './appointment-list.component.scss',
    imports: [BlankComponent]
})
export class AppointmentListComponent {

}
