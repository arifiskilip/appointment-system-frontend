import { Component } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";

@Component({
    selector: 'app-search-appointment',
    standalone: true,
    templateUrl: './search-appointment.component.html',
    styleUrl: './search-appointment.component.scss',
    imports: [BlankComponent]
})
export class SearchAppointmentComponent {
navigate(arg0: string) {
throw new Error('Method not implemented.');
}

}
