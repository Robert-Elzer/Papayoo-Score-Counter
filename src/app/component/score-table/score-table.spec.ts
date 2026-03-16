import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTable } from './score-table';

describe('ScoreTable', () => {
  let component: ScoreTable;
  let fixture: ComponentFixture<ScoreTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
