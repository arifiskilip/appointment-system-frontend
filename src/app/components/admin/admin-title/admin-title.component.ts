import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SwalService } from '../../../services/swal.service';
import bootstrap from '../../../../main.server';
import { Paginate } from '../../../models/paginateModel';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { ValidDirective } from '../../../common/directives/valid.directive';
import { TitleModel } from '../../../models/titleModel';
import { TitleService } from '../../../services/title.service';
import { ResetDirective } from '../../../../reset.directive';


// declare var $: any; // jQuery kullanacağımızı belirtiyoruz


@Component({
  selector: 'app-admin-title',
  standalone: true,
  templateUrl: './admin-title.component.html',
  styleUrl: './admin-title.component.scss',
  imports: [BlankComponent, ReactiveFormsModule, CommonModule, ValidDirective, ResetDirective]
})
export class AdminTitleComponent {
  title: TitleModel[] = []
  items: any[] = []
  isUpdateForm: boolean
  // @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  dataLoaded: boolean = false
  selectedTitle: TitleModel | undefined;
  validationMessages: ValidationMessages = new ValidationMessages();
  @ViewChild('closeButton') closeButton: ElementRef;
  myInput!: HTMLInputElement;
  
  constructor(private titleService: TitleService, private swal: SwalService) {

  }

  ngOnInit(): void {
    this.getTitles()
  }

  titleItems: Paginate<TitleModel[]>;
  getTitles() {

    this.titleService.getTitlesPagination(this.pageIndex, this.pageSize).subscribe((response) => {
      console.log("response1:" + response)
      this.titleItems = response.titles
      this.items = response.titles.items
      this.items.forEach((item) => {
        item.CreatedDate = new Date(item.CreatedDate)
        item.DeletedDate = new Date(item.CreatedDate)
      }
      );
      this.totalPages = response.titles.pagination.totalPages
      console.log("items1:" + this.items)
      this.dataLoaded = true
    })
  }
  //Pagination
  pageSize: number = 10;

  // Mevcut sayfa numarası
  pageIndex: number = 1;

  // Toplam sayfa sayısı
  totalPages: number;
  // Sayfaya git
  goToPage(page: number) {
    console.log("goto page >= 1 && page <= this.totalPages" + "page numarası:" + page + "this.totalPages :==>" + this.totalPages)
    if (page >= 1 && page <= this.totalPages) {
      console.log("burdaa pageafg")
      this.pageIndex = page;
      this.getTitles();
    }
  }

  // Önceki sayfaya git
  prevPage() {
    console.log("this.pageIndex > 1" + this.pageIndex)
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getTitles();
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    console.log("this.pageIndex < this.totalPages::" + "this.pageinex:" + this.pageIndex + "this.totalPages:" + this.totalPages)
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getTitles();
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    console.log('this.titleItems.pagination.pageIndex ' + this.titleItems.pagination.pageIndex)
    if (this.titleItems.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getTitles();
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getTitles();
    }
  }

  // Sayfa numaralarını döndürür
  getPageNumbers(): number[] {
    const pageNumbers = [];
    const maxPagesToShow = 10; // Sayfa numaralarının maksimum gösterileceği miktarı belirleyin
    const startPage = Math.max(
      1,
      this.pageIndex - Math.floor(maxPagesToShow / 2)
    );
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  // Kaç adet listeleneceğini beliritir
  goToChangeSelectedCount() {
    this.getTitles();
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }

  get unvan() {
    let unvan;
    if (this.isUpdateForm) {
      unvan = this.updateTitleForm.get('unvan');
    }
    else {
      unvan = this.titleForm.get('unvan');
    }

    return unvan;
  }

  titleForm = new FormGroup({
    unvan: new FormControl('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
    isDeleted: new FormControl(false),
    id: new FormControl(''),
  })

  updateTitleForm = new FormGroup({
    // unvan: new FormControl(''),
    unvan: new FormControl('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
    isDeleted: new FormControl(false),
    id: new FormControl('')
  })

  add() {
    this.isUpdateForm = false;

    if (this.titleForm.valid) {
      let titleModel: TitleModel = {
        Name: this.titleForm.value.unvan,
        IsDeleted: this.titleForm.value.isDeleted == null ? false :
          this.titleForm.value.isDeleted
      }

      this.titleService.add(titleModel).subscribe(response => {
        this.getTitles()
        this.swal.callToast("Ünvan başarıyla eklendi.");
        // İşlemden sonra formu sıfırla veya modalı kapat
        titleModel = undefined;
        this.titleForm.reset();

        if (this.closeButton) {
          (this.closeButton.nativeElement as HTMLButtonElement).click();
        }
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          this.swal.callToast("Ekleme işlemi başarısız !!");
        }
      })
    }
    else {
      this.swal.callToast("Formunuz eksik !!");
    }
  }


  onSelectAdd() {
    this.isUpdateForm = false;
    this.resetInput()
  }

  resetInput() {
    this.myInput = document.getElementById('myInput') as HTMLInputElement;
    this.myInput.className = ('form-control');
  }

  onSelect(title: any): void {
    this.resetInput()
    this.isUpdateForm = true;
    this.selectedTitle = title;

    this.updateTitleForm.patchValue({
      unvan: title.name,
      isDeleted: title.isDeleted,
      id: title.id
    });
  }

  update(): void {
    if (this.updateTitleForm && this.updateTitleForm.valid) {
      this.selectedTitle.Name = this.updateTitleForm.value.unvan;
      this.selectedTitle.IsDeleted = this.updateTitleForm.value.isDeleted;
      this.selectedTitle.Id = Number(this.updateTitleForm.value.id);

      this.titleService.update(this.selectedTitle).subscribe((response) => {
        this.getTitles()
        this.swal.callToast("Ünvan başarıyla güncellendi.");
      })

      // İşlemden sonra formu sıfırla veya modalı kapat
      this.selectedTitle = undefined;
      this.updateTitleForm.reset();

      if (this.closeButton) {
        (this.closeButton.nativeElement as HTMLButtonElement).click();
      }
    }

  }


  Close() {
    this.titleForm.reset();
    // if (this.inputElement && this.inputElement.nativeElement.classList.contains('form-control')) {
    //   this.inputElement.nativeElement.classList.remove('form-control');

    // }

  }


  delete(id: number) {
    this.titleService.delete(id).subscribe((response) => {
      this.getTitles()
    })
  }
  deleteItem(id: number): void {
    this.swal.callSwal("Ünvan Silme", "Silmek istediğinizden emin misiniz?", () => {
    this.titleService.delete(id).subscribe((response) => {
        this.getTitles();
        this.swal.callToast("Seçilen ünvan başarıyla silindi.");
      })
    }, "Evet")

  }
}



