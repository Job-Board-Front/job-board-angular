import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobActionsComponent } from './job-actions.component';

describe('JobActionsComponent', () => {
  let component: JobActionsComponent;
  let fixture: ComponentFixture<JobActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
