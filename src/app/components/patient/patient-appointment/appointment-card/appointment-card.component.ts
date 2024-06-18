import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BlankComponent } from "../../../blank/blank.component";
import { ScheduledAppointmentComponent } from '../scheduled-appointment/scheduled-appointment.component';

@Component({
    selector: 'app-appointment-card',
    standalone: true,
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        BlankComponent,
    ]
})
export class AppointmentCardComponent implements OnChanges{
  @Input() id?: number;
  @Input() date?: Date | string | null;
  @Input() branch?: string;
  @Input() title?: string;
  @Input() doctor?: string;
  @Input() imgUrl?: string;
  @Input() buttonLabel?: string;
  @Input() buttonCancel?: string;
  @Input() status?: string | undefined | null;
  @Output() statusChange = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter<number>();
  isCancelled: boolean | undefined;

  ngOnChanges() {
    this.isCancelled = this.status === 'Cancelled';
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
  cancelAppointment() {
    const confirmation = confirm("Randevunuz iptal edilecektir. Onaylıyor musunuz?");
    if (confirmation) {
      this.status = 'Cancelled';
      this.isCancelled = true;
      this.statusChange.emit(this.status);
    }
  }
 }
