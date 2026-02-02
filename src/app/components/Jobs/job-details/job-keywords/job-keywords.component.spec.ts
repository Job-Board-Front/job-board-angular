import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobKeywordsComponent } from './job-keywords.component';

describe('JobKeywordsComponent', () => {
  let component: JobKeywordsComponent;
  let fixture: ComponentFixture<JobKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobKeywordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
