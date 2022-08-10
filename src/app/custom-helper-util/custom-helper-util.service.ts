import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HUMIDITY_LABEL, HUMIDITY_SUFFIX, HUMIDITY_TITLE, TEMPERATURE_LABEL, TEMPERATURE_SUFFIX, TEMPERATURE_TITLE } from '../constants/weather.const';
import { ForeCastItem, WeatherList } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class CustomHelperUtilService {
  private enteredDate = new BehaviorSubject("");
  currentEnteredDate$ = this.enteredDate.asObservable();

  constructor(private datePipe: DatePipe) { }

  transformDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || "";
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.transformDate(currentDate);
    return formattedDate;
  }

  getNoOfDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  convertDateToNumber(date: string): number {
    return new Date(date).getTime();
  }

  getMonthFromDate(date: string): number {
    const currentDate = new Date(date);
    const currentMonth = currentDate.getMonth();
    return (currentMonth+1);
  }

  getYearFromDate(date: string): number {
    const currentDate = new Date(date);
    const currentYear = currentDate.getFullYear();
    return currentYear;
  }

  addZeroPrefix(num: number) {
    if(num.toString().length === 1) {
      return "0"+num;
    }
    return num;
  }

  getDatesList(year: number, month: number, noOfDays: number, remainingDays: number) {
    const finalDatesList = [];
    const limit = 4;
    for (let i = 0; i < noOfDays; i++) {
      // needs to handle month first day
      if ( ( (i % limit) === 0) ) {
        finalDatesList.push(`${year}-${this.addZeroPrefix(month)}-${this.addZeroPrefix(i+1)}`);
      }
    }
    return finalDatesList;
  }

  getNoOfDaysAndIterations(date: string) {
    const limit = 4;
    const currentMonth = this.getMonthFromDate(date);
    const currentYear = this.getYearFromDate(date);
    const noOfDays = this.getNoOfDaysInMonth(currentYear, currentMonth);
    const remainingDays = (noOfDays % limit);
    const datesList = this.getDatesList(currentYear, currentMonth, noOfDays, remainingDays);
    return datesList;
  }

  processData(data: any): Observable<WeatherList> {
    let highTempList: number[][] = [];
    let lowTempList: number[][] = [];
    let highHumidityList: number[][] = [];
    let lowHumidityList: number[][] = [];
    if (data && data.length > 0) {
      data.forEach((item: ForeCastItem) => {
        const formattedDate = this.convertDateToNumber(item.date);
        highTempList.push([
          formattedDate,
          item.temperature.high
        ]);
        lowTempList.push([
          formattedDate,
          item.temperature.low
        ]);
        highHumidityList.push([
          formattedDate,
          item.relative_humidity.high
        ]);
        lowHumidityList.push([
          formattedDate,
          item.relative_humidity.low
        ]);
      });
    }
    return of({
      temperature: {
        title: TEMPERATURE_TITLE,
        label: TEMPERATURE_LABEL,
        suffix: TEMPERATURE_SUFFIX,
        highList: highTempList,
        lowList: lowTempList,
      },
      humidity: {
        title: HUMIDITY_TITLE,
        label: HUMIDITY_LABEL,
        suffix: HUMIDITY_SUFFIX,
        lowList: lowHumidityList,
        highList: highHumidityList,
      }
    });
  }


  getDates(currentDate: string): Observable<any> {
    const datesList = this.getNoOfDaysAndIterations(currentDate);
    console.log(datesList);
    return of(datesList);
  }

  updateDate(date: string) {
    this.enteredDate.next(date);
  }

  // static data
  loadWeatherData() {
    const staticTemparatureList = [
      [1246406400000, 21.5],
      [1246492800000, 22.1],
      [1246579200000, 23],
      [1246665600000, 23.8],
      [1246752000000, 21.4],
      [1246838400000, 21.3],
      [1246924800000, 18.3],
      [1247011200000, 15.4],
      [1247097600000, 16.4],
      [1247184000000, 17.7],
      [1247270400000, 17.5],
      [1247356800000, 17.6],
      [1247443200000, 17.7],
      [1247529600000, 16.8],
      [1247616000000, 17.7],
      [1247702400000, 16.3],
      [1247788800000, 17.8],
      [1247875200000, 18.1],
      [1247961600000, 17.2],
      [1248048000000, 14.4],
      [1248134400000, 13.7],
      [1248220800000, 15.7],
      [1248307200000, 14.6],
      [1248393600000, 15.3],
      [1248480000000, 15.3],
      [1248566400000, 15.8],
      [1248652800000, 15.2],
      [1248739200000, 14.8],
      [1248825600000, 14.4],
      [1248912000000, 15],
      [1248998400000, 13.6],
    ];
    return staticTemparatureList;
  }

}

