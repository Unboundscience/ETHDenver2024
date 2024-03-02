import {Component, OnInit} from '@angular/core';
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {distinctUntilChanged} from "rxjs";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarModule,
    MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import {UserAccountService} from "../shared/services/user-account.service";
import {ViemService} from "../../core/services/viem.service";

@Component({
    selector: 'app-sign-up-flow',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatIconModule,
        MatSnackBarModule
    ],
    providers: [
        UserAccountService
    ],
    templateUrl: './sign-up-flow.component.html',
    styleUrl: './sign-up-flow.component.scss'
})
export class SignUpFlowComponent implements OnInit {
    userClassForm: FormGroup;
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    duration = 1200;

    constructor(private fb: FormBuilder,
                private router: Router,
                private snackBarService: MatSnackBar,
                private userAccServ: UserAccountService,
                private veimService: ViemService) {
        this.userClassForm = this.fb.group({
            userClass: this.fb.control([], Validators.required)
        })
    }
    async startVeim() {
        await this.veimService.init();
    }

    async mintScientistNFT() {
        await this.veimService.mintScientistNFT();
    }

    ngOnInit(): void {
        this.startVeim();
        this.userClassForm.get('userClass')?.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((formValue) => {
                this.snackBarService.open(`Let's get your info ${formValue.toUpperCase()}`, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.duration
                });
                this.userAccServ.setUserProp('userClass', formValue);
                setTimeout(() => {
                    if (formValue === 'scientist') {
                        this.mintScientistNFT();
                    }
                    this.router.navigate(['/dashboard']);
                }, 750);
            });
    }



}
