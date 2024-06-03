import { Component } from "@angular/core";
import { SharedModule } from "../../../common/shared/shared.module";
import { AdminMenus } from "../../../menu";
import { MenuPipe } from "../../../pipes/menu.pipe";


@Component({
    selector: 'app-admin-sidebar',
    standalone: true,
    templateUrl: './admin-sidebar.component.html',
    styleUrl: './admin-sidebar.component.scss',
    imports: [SharedModule, MenuPipe]
})
export class AdminSidebarComponent {
  search: string = "";
  menus = AdminMenus;
}
