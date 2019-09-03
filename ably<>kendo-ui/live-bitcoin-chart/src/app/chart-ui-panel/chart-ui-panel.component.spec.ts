import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUiPanelComponent } from './chart-ui-panel.component';

describe('ChartUiPanelComponent', () => {
  let component: ChartUiPanelComponent;
  let fixture: ComponentFixture<ChartUiPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartUiPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartUiPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
