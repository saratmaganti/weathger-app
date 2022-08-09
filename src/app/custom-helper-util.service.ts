import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HUMIDITY_LABEL, HUMIDITY_SUFFIX, HUMIDITY_TITLE, TEMPERATURE_LABEL, TEMPERATURE_SUFFIX, TEMPERATURE_TITLE } from './constants/weather.const';
import { ForeCastItem, WeatherList } from './model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class CustomHelperUtilService {

  constructor(
    private datePipe: DatePipe
  ) { }

  transformDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || "";
  }

  addZeroPrefix(num: number) {
    if(num.toString().length === 1) {
      return "0"+num;
    }
    return num;
  }

  getNoOfDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  getDatesList(year: number, month: number, noOfDays: number, remainingDays: number) {
    const finalDatesList = [];
    const limit = 4;
    for (let i = 0; i < noOfDays; i++) {
      if ( i === 0 || ( (i % limit) === 0) ) {
        finalDatesList.push(`${year}-${this.addZeroPrefix(month)}-${this.addZeroPrefix(i+1)}`);
      }
    }
    console.log(finalDatesList);
    return finalDatesList;
  }

  getMonthFromDate(date: string): number {
    const currentDate = new Date(date);
    const currentMonth = currentDate.getMonth();
    return currentMonth;
  }

  getYearFromDate(date: string): number {
    const currentDate = new Date(date);
    const currentYear = currentDate.getFullYear();
    return currentYear;
  }

  getNoOfDaysAndIterations(date: string) {
    const limit = 4;
    const currentMonth = this.getMonthFromDate(date);
    const currentYear = this.getYearFromDate(date);
    const noOfDays = this.getNoOfDaysInMonth(currentYear, currentMonth);
    const remainingDays = (noOfDays % limit);
    const noOfIterations = Math.floor(noOfDays/limit);
    const datesList = this.getDatesList(currentYear, currentMonth, noOfDays, remainingDays);
    // const obj = {
    //   remainingDays: remainingDays,
    //   noOfIterations: noOfIterations
    // };
    // return obj;
    return datesList;
  }

  convertDateToNumber(date: string): number {
    return new Date(date).getTime();
  }

  processData(data: any): Observable<WeatherList> {
    // let formattedList = {
    //   api_info: data.api_info,
    //   items: []
    // };
    let highTempList: number[][] = [];
    let lowTempList: number[][] = [];
    let highHumidityList: number[][] = [];
    let lowHumidityList: number[][] = [];
    if (data && data.length > 0) {
      data.forEach((item: ForeCastItem) => {
        const formattedDate = this.convertDateToNumber(item.date);
        console.log(item.date);
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

}

