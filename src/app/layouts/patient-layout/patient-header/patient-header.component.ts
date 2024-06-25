import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.scss'
})
export class PatientHeaderComponent {
  /**
   *
   */
  constructor(public authService:AuthService) {
    
    
  }
logout() {
}

}
