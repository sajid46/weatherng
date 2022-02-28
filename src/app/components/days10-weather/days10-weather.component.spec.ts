import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Days10WeatherComponent } from './days10-weather.component';

describe('Days10WeatherComponent', () => {
  let component: Days10WeatherComponent;
  let fixture: ComponentFixture<Days10WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Days10WeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Days10WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
