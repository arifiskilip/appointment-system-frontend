import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { AdminMenus, DoctorMenus, MenuModel } from '../../../menu';
import { MenuPipe } from "../../../pipes/menu.pipe";

@Component({
    selector: 'app-doctor-sidebar',
    standalone: true,
    templateUrl: './doctor-sidebar.component.html',
    styleUrl: './doctor-sidebar.component.scss',
    imports: [SharedModule, MenuPipe]
})
export class DoctorSidebarComponent {
  search: string = "";
  menus = DoctorMenus;
}
