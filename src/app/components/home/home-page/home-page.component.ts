import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
toggleMobileNav() {
throw new Error('Method not implemented.');
}
  activeSection: string = 'hero';

  isActive(sectionName: string): boolean {
    return this.activeSection === sectionName;
  }

  setActive(sectionName: string): void {
    this.activeSection = sectionName;
  }
}
