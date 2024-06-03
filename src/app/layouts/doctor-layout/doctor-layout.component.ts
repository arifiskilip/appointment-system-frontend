import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { DoctorHeaderComponent } from "./doctor-header/doctor-header.component";
import { DoctorSidebarComponent } from "./doctor-sidebar/doctor-sidebar.component";
import { DoctorFooterComponent } from "./doctor-footer/doctor-footer.component";

@Component({
    selector: 'app-doctor-layout',
    standalone: true,
    templateUrl: './doctor-layout.component.html',
    styleUrl: './doctor-layout.component.scss',
    imports: [SharedModule, DoctorHeaderComponent, DoctorSidebarComponent, DoctorFooterComponent]
})
export class DoctorLayoutComponent {

}
