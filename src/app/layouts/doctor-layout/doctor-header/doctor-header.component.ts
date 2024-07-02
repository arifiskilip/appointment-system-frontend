import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-doctor-header',
  standalone: true,
  imports: [],
  templateUrl: './doctor-header.component.html',
  styleUrl: './doctor-header.component.scss'
})
export class DoctorHeaderComponent {
  /**
   *
   */
  constructor(public authService:AuthService) {
    
    
  }
logout() {
}

}
