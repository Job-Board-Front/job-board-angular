import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsCardComponent } from './job-details-card.component';

describe('JobDetalsCardComponent', () => {
  let component: JobDetailsCardComponent;
  let fixture: ComponentFixture<JobDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
