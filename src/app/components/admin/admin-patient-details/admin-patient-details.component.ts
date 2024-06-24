import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';

@Component({
  selector: 'app-admin-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    BlankComponent
  ],
  templateUrl: './admin-patient-details.component.html',
  styleUrl: './admin-patient-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPatientDetailsComponent {
  activeTab: string = 'activity';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
