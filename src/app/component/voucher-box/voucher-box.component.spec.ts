import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherBoxComponent } from './voucher-box.component';

describe('VoucherBoxComponent', () => {
  let component: VoucherBoxComponent;
  let fixture: ComponentFixture<VoucherBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
