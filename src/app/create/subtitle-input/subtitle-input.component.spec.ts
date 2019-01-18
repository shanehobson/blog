import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleInputComponent } from './subtitle-input.component';

describe('SubtitleInputComponent', () => {
  let component: SubtitleInputComponent;
  let fixture: ComponentFixture<SubtitleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
