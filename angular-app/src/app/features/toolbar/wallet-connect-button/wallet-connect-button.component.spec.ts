import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletConnectButtonComponent } from './wallet-connect-button.component';

describe('WalletConnectButtonComponent', () => {
  let component: WalletConnectButtonComponent;
  let fixture: ComponentFixture<WalletConnectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletConnectButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletConnectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
