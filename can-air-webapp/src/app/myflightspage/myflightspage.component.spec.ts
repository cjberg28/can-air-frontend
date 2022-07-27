import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyflightspageComponent } from './myflightspage.component';

describe('MyflightspageComponent', () => {
  let component: MyflightspageComponent;
  let fixture: ComponentFixture<MyflightspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyflightspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyflightspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
