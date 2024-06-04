import { Component } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
    selector: 'app-admin-branch',
    standalone: true,
    templateUrl: './admin-branch.component.html',
    styleUrl: './admin-branch.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class AdminBranchComponent {

}
