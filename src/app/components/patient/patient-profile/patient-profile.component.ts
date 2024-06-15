import { Component } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
    selector: 'app-patient-profile',
    standalone: true,
    templateUrl: './patient-profile.component.html',
    styleUrl: './patient-profile.component.scss',
    imports: [BlankComponent,SharedModule]
})
export class PatientProfileComponent {
  activeTab: string = 'activity';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
