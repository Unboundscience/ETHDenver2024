import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ViemService} from "../../../core/services/viem.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
    selector: 'app-create-proposal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './create-proposal.component.html',
    styleUrl: './create-proposal.component.scss'
})
export class CreateProposalComponent {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    duration = 1200;
    createProposalForm: FormGroup;

    constructor(private fb: FormBuilder,
                private veim: ViemService,
                private snackBarService: MatSnackBar) {
        this.createProposalForm = this.fb.group({
            title: this.fb.control([], Validators.required),
            description: this.fb.control([], Validators.required),
            tokenId: this.fb.control([], Validators.required)
        });
    }

    async proposal() {
        const { title, description, tokenId } = this.createProposalForm.getRawValue();
        await this.veim.submitProposal(title, description, tokenId)
        this.openSnackBar('Proposal Submitted Successfully!');
        }

    openSnackBar(msg: string) {
        this.snackBarService.open(msg, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.duration
        });
    }
}
