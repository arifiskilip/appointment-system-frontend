

import { Component } from '@angular/core';
import { AdminHeaderComponent } from "./admin-header/admin-header.component";
import { AdminFooterComponent } from "./admin-footer/admin-footer.component";
import { SharedModule } from '../../common/shared/shared.module';
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss',
    imports: [AdminHeaderComponent, AdminFooterComponent, SharedModule, AdminSidebarComponent]
})
export class AdminLayoutComponent {

}
