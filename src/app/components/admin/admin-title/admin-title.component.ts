import { Component } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";

@Component({
    selector: 'app-admin-title',
    standalone: true,
    templateUrl: './admin-title.component.html',
    styleUrl: './admin-title.component.scss',
    imports: [BlankComponent]
})
export class AdminTitleComponent {

}
