import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('ExpenseGridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
