import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsChipComponent } from './skills-chip.component';

describe('SkillsChipComponent', () => {
  let component: SkillsChipComponent;
  let fixture: ComponentFixture<SkillsChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
