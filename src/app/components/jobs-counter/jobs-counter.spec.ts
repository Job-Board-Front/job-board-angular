import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCounter } from './jobs-counter';

describe('JobsCounter', () => {
  let component: JobsCounter;
  let fixture: ComponentFixture<JobsCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
