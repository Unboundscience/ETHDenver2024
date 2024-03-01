import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

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
  createProposalForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createProposalForm = this.fb.group({
      title: this.fb.control([], Validators.required),
      description: this.fb.control([], Validators.required),
    });
  }

  submitProposal(): void {
      
  }

}
