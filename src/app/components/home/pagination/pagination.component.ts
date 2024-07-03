import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(newPage: number) {
    this.pageIndex = newPage;
    this.pageChange.emit(this.pageIndex);
  }

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.pageSize);
    const pageNumbers = [];

      for (let i =1; i <= pageCount; i++) pageNumbers.push(i);

    return pageNumbers;
  }
  get hasPrevPage(): boolean {
    return this.pageIndex > 1;
  }
  get hasNextPage(): boolean {
    return this.pageIndex * this.pageSize < this.totalItems;
  }
 }
