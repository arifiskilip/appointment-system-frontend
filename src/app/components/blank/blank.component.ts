import { Component, Input } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {
  @Input() pageName: string = "";
  @Input() routes: string[] = [];
}
