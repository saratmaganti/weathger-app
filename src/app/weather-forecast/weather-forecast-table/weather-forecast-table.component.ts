import { Component, OnInit } from '@angular/core';
import { TABLE_COLUMNS } from 'src/app/constants/weather.const';
import { CustomHelperUtilService } from 'src/app/custom-helper-util/custom-helper-util.service';
import { WeatherForecastDataService } from 'src/app/weather-forecast-data/weather-forecast-data.service';

@Component({
  selector: 'app-weather-forecast-table',
  templateUrl: './weather-forecast-table.component.html',
  styleUrls: ['./weather-forecast-table.component.scss'],
})
export class WeatherForecastTableComponent implements OnInit {
  tblDataForTemperature!: any;
  tblDataForHumidity!: any;
  readonly tblColumns = TABLE_COLUMNS;

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
        this.customHelperUtilService.processData(currentMonthDates).subscribe({
          next: (formattedList) => {
            this.tblDataForTemperature = [...formattedList.temperature.tblList];
            this.tblDataForHumidity = [...formattedList.humidity.tblList];
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
        setTimeout(() => {
          this.getWeatherData(data);
        }, 500);
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
