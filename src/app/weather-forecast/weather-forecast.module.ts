import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineChartComponent } from './line-chart/line-chart.component';
import { WeatherForecastContainerComponent } from './weather-forecast-container/weather-forecast-container.component';
import { WeatherForecastReportComponent } from './weather-forecast-report/weather-forecast-report.component';
import { WeatherForecastTableComponent } from './weather-forecast-table/weather-forecast-table.component';
import { RouterModule, Routes } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CustomDataTableComponent } from './custom-data-table/custom-data-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },
  {
    path: '',
    component: WeatherForecastContainerComponent,
    children: [
      { path: 'report', component: WeatherForecastReportComponent },
      { path: 'table', component: WeatherForecastTableComponent },
    ],
  },
];

@NgModule({
  declarations: [
    LineChartComponent,
    CustomDataTableComponent,
    WeatherForecastContainerComponent,
    WeatherForecastReportComponent,
    WeatherForecastTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HighchartsChartModule,
    AgGridModule
  ],
})
export class WeatherForeCastModule {}
