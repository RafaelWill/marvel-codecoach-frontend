import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesOverviewComponent } from './coaches-overview.component';

describe('CoachesOverviewComponent', () => {
  let component: CoachesOverviewComponent;
  let fixture: ComponentFixture<CoachesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
