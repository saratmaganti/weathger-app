import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartOption, WeatherChartOptions } from '../../model/weather.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() chartData!: any;
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions!: any;

  constructor() { }

  loadChart(data: ChartOption): WeatherChartOptions {
    const chartOptions = {
      title: { text: "" }, // data.title
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Hyderabad',
        },
        // categories: ['Jan-1', 'Jan-2', 'Jan-3', 'Jan-4', 'Jan-5', 'Jan-6'],
        // accessibility: {
        //   rangeDescription: 'Range: Jul 1st 2009 to Jul 31st 2009.',
        // },
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
    this.chartOptions = this.loadChart(this.chartData);
  }

  ngOnChanges(): void {
    this.chartOptions = this.loadChart(this.chartData);
  }

}
