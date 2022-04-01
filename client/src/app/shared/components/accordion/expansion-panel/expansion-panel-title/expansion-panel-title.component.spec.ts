import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelTitleComponent } from './expansion-panel-title.component';

describe('ExpansionPanelTitleComponent', () => {
  let component: ExpansionPanelTitleComponent;
  let fixture: ComponentFixture<ExpansionPanelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionPanelTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
