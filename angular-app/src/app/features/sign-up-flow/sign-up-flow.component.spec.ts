import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFlowComponent } from './sign-up-flow.component';

describe('SignUpFlowComponent', () => {
  let component: SignUpFlowComponent;
  let fixture: ComponentFixture<SignUpFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
