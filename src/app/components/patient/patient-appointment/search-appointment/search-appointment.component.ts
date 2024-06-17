import { Component } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
    selector: 'app-search-appointment',
    standalone: true,
    templateUrl: './search-appointment.component.html',
    styleUrl: './search-appointment.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class SearchAppointmentComponent {
navigate(arg0: string) {
throw new Error('Method not implemented.');
}

}
