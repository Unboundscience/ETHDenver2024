import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaoApproveComponent } from './dao-approve.component';

describe('DaoApproveComponent', () => {
  let component: DaoApproveComponent;
  let fixture: ComponentFixture<DaoApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaoApproveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaoApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
