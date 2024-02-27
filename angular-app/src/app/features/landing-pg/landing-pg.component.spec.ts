import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPgComponent } from './landing-pg.component';

describe('LandingPgComponent', () => {
  let component: LandingPgComponent;
  let fixture: ComponentFixture<LandingPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
