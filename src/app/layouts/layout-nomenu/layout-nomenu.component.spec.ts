import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNomenuComponent } from './layout-nomenu.component';

describe('LayoutNomenuComponent', () => {
  let component: LayoutNomenuComponent;
  let fixture: ComponentFixture<LayoutNomenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutNomenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutNomenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
