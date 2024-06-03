import { Component } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';
import { SharedModule } from '../../../common/shared/shared.module';


@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class AdminDashboardComponent {

}
