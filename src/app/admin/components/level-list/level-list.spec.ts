import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelList } from './level-list';

describe('LevelList', () => {
  let component: LevelList;
  let fixture: ComponentFixture<LevelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
