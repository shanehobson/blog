import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideMailingListComponent } from './aside-mailing-list.component';

describe('AsideMailingListComponent', () => {
  let component: AsideMailingListComponent;
  let fixture: ComponentFixture<AsideMailingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideMailingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideMailingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
