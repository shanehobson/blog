import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideAboutComponent } from './aside-about.component';

describe('AsideAboutComponent', () => {
  let component: AsideAboutComponent;
  let fixture: ComponentFixture<AsideAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
