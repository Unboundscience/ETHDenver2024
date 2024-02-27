import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonpocComponent } from './jsonpoc.component';

describe('JsonpocComponent', () => {
  let component: JsonpocComponent;
  let fixture: ComponentFixture<JsonpocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonpocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonpocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
