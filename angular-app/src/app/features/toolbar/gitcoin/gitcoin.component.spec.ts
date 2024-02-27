import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitcoinComponent } from './gitcoin.component';

describe('GitcoinComponent', () => {
  let component: GitcoinComponent;
  let fixture: ComponentFixture<GitcoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitcoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
