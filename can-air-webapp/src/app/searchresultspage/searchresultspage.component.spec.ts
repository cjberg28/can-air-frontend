import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultspageComponent } from './searchresultspage.component';

describe('SearchresultspageComponent', () => {
  let component: SearchresultspageComponent;
  let fixture: ComponentFixture<SearchresultspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchresultspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchresultspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
