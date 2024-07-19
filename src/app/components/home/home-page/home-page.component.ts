import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
constructor(public auth:AuthService, private router:Router) {
  
}
  activeSection: string = 'hero';

  isActive(sectionName: string): boolean {
    return this.activeSection === sectionName;
  }

  setActive(sectionName: string): void {
    this.activeSection = sectionName;
  }
  getPanel(){
    this.router.navigateByUrl('/'+this.auth.getUserRole().toLowerCase());
  }
}
