import { Component } from '@angular/core';
import { SharedModule } from './common/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  template: `
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#fff" 
  type = "ball-clip-rotate-multiple" [fullScreen] = "true"><p style="color: white" > 
  Yükleniyor... </p></ngx-spinner>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'appointment-system-frontend';
}
