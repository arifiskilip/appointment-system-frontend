import { Component } from '@angular/core';
import { PatientMenus } from '../../../menu';
import { SharedModule } from '../../../common/shared/shared.module';
import { MenuPipe } from "../../../pipes/menu.pipe";

@Component({
    selector: 'app-patient-sidebar',
    standalone: true,
    templateUrl: './patient-sidebar.component.html',
    styleUrl: './patient-sidebar.component.scss',
    imports: [SharedModule, MenuPipe]
})
export class PatientSidebarComponent {
  search: string = "";
  menus = PatientMenus;
}
