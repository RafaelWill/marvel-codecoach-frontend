import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoachProfileComponent } from './my-coach-profile.component';

describe('MyCoachProfileComponent', () => {
  let component: MyCoachProfileComponent;
  let fixture: ComponentFixture<MyCoachProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCoachProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoachProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
