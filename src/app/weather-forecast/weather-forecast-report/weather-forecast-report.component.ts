import { Component, OnInit } from '@angular/core';
import { CustomHelperUtilService } from 'src/app/custom-helper-util/custom-helper-util.service';
import { WeatherForecastDataService } from 'src/app/weather-forecast-data/weather-forecast-data.service';

@Component({
  selector: 'app-weather-forecast-report',
  templateUrl: './weather-forecast-report.component.html',
  styleUrls: ['./weather-forecast-report.component.scss'],
})
export class WeatherForecastReportComponent implements OnInit {
  chartOptionsForTemperature!: any;
  chartOptionsForHumidity!: any;

  constructor(
    private weatherForeCastDataService: WeatherForecastDataService,
    private customHelperUtilService: CustomHelperUtilService
  ) {}

  getWeatherData(formattedDate: string) {
    const currentMonth =
      this.customHelperUtilService.getMonthFromDate(formattedDate);
    this.weatherForeCastDataService.getFullData(formattedDate).subscribe({
      next: (data: any) => {
        const merged = [].concat
          .apply([], data)
          .filter((item) => item !== undefined);
        const currentMonthDates = merged.filter(
          (item: any) => Number(item.date.split('-')[1]) === currentMonth
        );
        console.log(currentMonthDates);
        this.customHelperUtilService.processData(currentMonthDates).subscribe({
          next: (formattedList) => {
            this.chartOptionsForTemperature = { ...formattedList.temperature };
            this.chartOptionsForHumidity = { ...formattedList.humidity };
          },
          error: (error) => {
            console.error('There was an error in processData() Method', error);
          },
        });
      },
      error: (error) => {
        console.error('There was an error in getDates() Method', error);
      },
    });
  }

  loadData() {
    this.customHelperUtilService.currentEnteredDate$.subscribe({
      next: (data) => {
        this.getWeatherData(data);
      },
      error: (error) => {
        console.error('There was an error in loadData() Method', error);
      },
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
}
