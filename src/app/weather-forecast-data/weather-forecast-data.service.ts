import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, zip, shareReplay } from 'rxjs';
import { WEATHER_FORECAST_TYPES } from '../constants/weather.const';
import { CustomHelperUtilService } from '../custom-helper-util/custom-helper-util.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastDataService {
  constructor(
    private http: HttpClient,
    private customHelperUtilService: CustomHelperUtilService
  ) {}

  getWeatherForecastData(formattedDate: string, type: string): Observable<any> {
    return this.http
      .get(
        `https://api.data.gov.sg/v1/environment/${type}-weather-forecast?date=${formattedDate}`
      )
      .pipe(shareReplay(1));
  }

  getFullData(formattedDate: string): Observable<any> {
    return this.customHelperUtilService.getDates(formattedDate).pipe(
      switchMap((datesList: string[]) => {
        // map every user into an array of observable requests
        const usersObservables = datesList.map((date) =>
          this.getWeatherForecastData(
            date,
            WEATHER_FORECAST_TYPES.FOUR_DAYS
          ).pipe(
            map((res: any) => (res?.items ? res?.items[0]?.forecasts : []))
          )
        );
        return zip(...usersObservables);
      })
    );
  }
}
