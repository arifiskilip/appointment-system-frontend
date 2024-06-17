import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";

@Component({
    selector: 'app-appointment-card',
    standalone: true,
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        BlankComponent
    ]
})
export class AppointmentCardComponent {
  @Input() id?: number;
  @Input() date?: Date | string | null;
  @Input() branch?: string;
  @Input() title?: string;
  @Input() doctor?: string;
  @Input() imgUrl?: string;
  @Input() buttonLabel?: string;
  @Output() buttonClick = new EventEmitter<number>();

  onButtonClick() {
    this.buttonClick.emit();
  }
 }
