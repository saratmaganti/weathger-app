import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { map, switchMap, zip } from 'rxjs';
import { CustomHelperUtilService } from '../custom-helper-util.service';
import { ChartOption, WeatherChartOptions, WeatherList } from '../model/weather.model';
import { WeatherForecastDataService } from '../weather-forecast-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

  chartOptionsForTemperature!: any;
  chartOptionsForHumidity!: any;
  Highcharts: typeof Highcharts = Highcharts;

  constructor(
    private weatherForeCastDataService: WeatherForecastDataService,
    private customHelperUtilService: CustomHelperUtilService) { }

  getWeatherData() {
    const currentDate = new Date();
    const formattedDate = this.customHelperUtilService.transformDate(currentDate);
    const currentMonth = this.customHelperUtilService.getMonthFromDate(formattedDate);
    this.weatherForeCastDataService.getDates(formattedDate).pipe(
      switchMap((datesList: string[]) => {
        // map every user into an array of observable requests
        const usersObservables = datesList.map(date => this.weatherForeCastDataService.callMethod(date).pipe(
          map(res => res.items[0].forecasts)
        ));
        return zip(...usersObservables);
      })
    ).subscribe({
      next: (data: any) => {
        const merged = [].concat.apply([], data);
        const currentMonthDates = merged.filter((item: any) => Number(item.date.split("-")[1]) === currentMonth);
        console.log(currentMonthDates);
        this.customHelperUtilService.processData(currentMonthDates).subscribe({
          next: (formattedList) => {
            console.log(formattedList);
            this.chartOptionsForTemperature = { ...this.loadChart(formattedList.temperature) };
            this.chartOptionsForHumidity = { ...this.loadChart(formattedList.humidity) };
          },
          error: (error) => {
            console.error('There was an error in processData() Method', error);
          }
        });
      },
      error: (error) => {
        console.error('There was an error in getDates() Method', error);
      }
    });

    // this.weatherForeCastDataService.getData().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.customHelperUtilService.processData(data).subscribe({
    //       next: (formattedList) => {
    //         console.log(formattedList);
    //         this.chartOptionsForTemperature = { ...this.loadChart(formattedList.temperature) };
    //         this.chartOptionsForHumidity = { ...this.loadChart(formattedList.humidity) };
    //       }
    //     });
    //   },
    //   error: (error) => {
    //     console.error('There was an error!', error);
    //   },
    // });
  }

  loadChart(data: ChartOption): WeatherChartOptions {
    const chartOptions = {
      title: { text: data.title },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Hyderabad',
        },
        // categories: ['Jan-1', 'Jan-2', 'Jan-3', 'Jan-4', 'Jan-5', 'Jan-6'],
        accessibility: {
          rangeDescription: 'Range: Jul 1st 2009 to Jul 31st 2009.',
        },
      },
      yAxis: {
        title: {
          text: data.label,
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'line',
          name: `High ${data.label}`,
          data: data.highList,
          tooltip: {
            valueSuffix: data.suffix,
            xDateFormat: '%A, %b %e',
          },
        },
        {
          type: 'line',
          name: `Low ${data.label}`,
          data: data.lowList,
          tooltip: {
            valueSuffix: data.suffix,
            xDateFormat: '%A, %b %e',
          },
        },
      ],
    };
    return chartOptions;
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

}
