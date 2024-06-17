import { Component, Input, OnInit } from '@angular/core';
import { BlankComponent } from "../../blank/blank.component";
import { SharedModule } from '../../../common/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from '../../../common/constants/validationMessages';
import { ValidDirective } from '../../../common/directives/valid.directive';

@Component({
    selector: 'app-admin-branch',
    standalone: true,
    templateUrl: './admin-branch.component.html',
    styleUrl: './admin-branch.component.scss',
    imports: [BlankComponent,SharedModule,ValidDirective]
})
export class AdminBranchComponent implements OnInit{

    ngOnInit(): void {
        this.createBranchAddForm()
    }

    constructor(private formBuilder:FormBuilder) {

    }
    branchAddForm:FormGroup;
    validationMessages:ValidationMessages = new  ValidationMessages();

    get name(){
        return this.branchAddForm.get('name');
    }
    createBranchAddForm(){
        this.branchAddForm = this.formBuilder.group({
            name:[
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ]
            ]
        })
    }
}
