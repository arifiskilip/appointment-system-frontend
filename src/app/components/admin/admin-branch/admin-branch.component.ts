import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../services/swal.service';
import { Paginate } from '../../../models/paginateModel';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { ValidDirective } from '../../../common/directives/valid.directive';
import { BranchModel } from '../../../models/branchModel';
import { BranchService } from '../../../services/branch.service';


@Component({
    selector: 'app-admin-branch',
    standalone: true,
    templateUrl: './admin-branch.component.html',
    styleUrl: './admin-branch.component.scss',
    imports: [BlankComponent, ReactiveFormsModule, CommonModule, ValidDirective]
})

export class AdminBranchComponent{
  branch: BranchModel[] = []
  items: any[] = []
  isUpdateForm: boolean
  // @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  dataLoaded: boolean = false
  selectedBranch: BranchModel | undefined;
  validationMessages: ValidationMessages = new ValidationMessages();
  @ViewChild('closeButton') closeButton: ElementRef;
  myInput!: HTMLInputElement;

  constructor(private branchService: BranchService, private swal: SwalService) {
  }

  ngOnInit(): void {
      this.getBranchs()
  }

  branchItems: Paginate<BranchModel[]>;
  getBranchs() {
    this.branchService.getBranchsPagination(this.pageIndex, this.pageSize).subscribe((response) => {
        this.branchItems = response.branches;
        this.items = response.branches.items;
        this.items.forEach((item) => {
          item.CreatedDate = new Date(item.CreatedDate)
          item.DeletedDate = new Date(item.CreatedDate)
        });
        this.totalPages = response.branches.pagination.totalPages
        this.dataLoaded = true
     });
  } 
  
   //Pagination
   pageSize: number = 10;

   // Mevcut sayfa numarası
   pageIndex: number = 1;
 
   // Toplam sayfa sayısı
   totalPages: number;
  
  // Sayfaya git
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageIndex = page;
      this.getBranchs();
    }
  }

  // Önceki sayfaya git
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getBranchs();
    }
  }

  // Sonraki sayfaya git
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getBranchs();
    }
  }

  // İlk sayfaya git
  goToFirstPage() {
    if (this.branchItems.pagination.pageIndex > 1) {
      this.pageIndex = 1;
      this.getBranchs();
    }
  }

  // Son sayfaya git
  goToLastPage() {
    if (this.totalPages > this.pageIndex) {
      this.pageIndex = this.totalPages;
      this.getBranchs();
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
    this.getBranchs();
  }

  // Başlangıç indisini hesaplar
  calculateStartIndex(): number {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }

  get name() {
    let name;
    if (this.isUpdateForm) {
      name = this.updateBranchForm.get('name');
    }
    else {
      name = this.branchForm.get('name');
    }
    return name;
  }
  

  branchForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.required
    ]),
    isDeleted: new FormControl(false),
    id: new FormControl('')
  });
  
  updateBranchForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.required
    ]),
    isDeleted: new FormControl(false),
    id: new FormControl('')
  });
  

  add() {
    this.isUpdateForm = false;

    if (this.branchForm.valid) {
      let branchModel: BranchModel = {
        name: this.branchForm.value.name,
        isDeleted: this.branchForm.value.isDeleted == null ? true :
        this.branchForm.value.isDeleted ? false : true
      }

      this.branchService.add(branchModel).subscribe(response => {
        this.getBranchs()
        this.swal.callToast("Branş başarıyla eklendi.");
        // İşlemden sonra formu sıfırla veya modalı kapat
        branchModel = undefined;
        this.branchForm.reset();

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

  onSelect(branch: any): void {
    this.resetInput()
    this.isUpdateForm = true;
    this.selectedBranch = branch;

    this.updateBranchForm.patchValue({
      name: branch.name,
      isDeleted: branch.isDeleted ? false : true ,
      id: branch.id
    });
  }

  update(): void {
    if (this.updateBranchForm && this.updateBranchForm.valid) {
      this.selectedBranch.name = this.updateBranchForm.value.name;
      this.selectedBranch.isDeleted = this.updateBranchForm.value.isDeleted  ? false : true;
      this.selectedBranch.id = Number(this.updateBranchForm.value.id);

      this.branchService.update(this.selectedBranch).subscribe((response) => {
        this.getBranchs()
        this.swal.callToast("Branş başarıyla güncellendi.");
      })

      // İşlemden sonra formu sıfırla veya modalı kapat
      this.selectedBranch = undefined;
      this.updateBranchForm.reset();

      if (this.closeButton) {
        (this.closeButton.nativeElement as HTMLButtonElement).click();
      }
    }
  }

  Close() {
    this.branchForm.reset();
  }

  delete(id: number) {
    this.branchService.delete(id).subscribe((response) => {
      this.getBranchs()
    })
  }
  
  deleteItem(id: number): void {
    this.swal.callSwal("Branş Silme", "Silmek istediğinizden emin misiniz?", () => {
    this.branchService.delete(id).subscribe((response) => {
        this.getBranchs();
        this.swal.callToast("Seçilen branş başarıyla silindi.");
      })
    }, "Evet")
  }
}