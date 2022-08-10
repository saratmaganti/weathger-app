import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastReportComponent } from './weather-forecast-report.component';

describe('WeatherForecastReportComponent', () => {
  let component: WeatherForecastReportComponent;
  let fixture: ComponentFixture<WeatherForecastReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherForecastReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherForecastReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
