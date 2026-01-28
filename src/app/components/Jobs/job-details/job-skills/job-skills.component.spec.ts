import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSkillsComponent } from './job-skills.component';

describe('JobSkillsComponent', () => {
  let component: JobSkillsComponent;
  let fixture: ComponentFixture<JobSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
