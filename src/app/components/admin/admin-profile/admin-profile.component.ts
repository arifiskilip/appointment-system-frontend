import { Component } from '@angular/core';
import { BlankComponent } from '../../blank/blank.component';
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [SharedModule,BlankComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {
  activeTab: string = 'activity';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
