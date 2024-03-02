import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ViemService} from "../../core/services/viem.service";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-dao-approve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './dao-approve.component.html',
  styleUrl: './dao-approve.component.scss'
})
export class DaoApproveComponent {
  daoForm: FormGroup;
  constructor(private viemService: ViemService,
              private fb: FormBuilder) {
    this.daoForm = this.fb.group({
        daoApprove: this.fb.control([])
        });
    }
    async startVeim() {
        await this.viemService.init();
    }

    submit() {
        console.log(this.daoForm.getRawValue());
    }

}
