import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveflightpageComponent } from './reserveflightpage.component';

describe('ReserveflightpageComponent', () => {
  let component: ReserveflightpageComponent;
  let fixture: ComponentFixture<ReserveflightpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveflightpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveflightpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
