import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomHelperUtilService } from 'src/app/custom-helper-util/custom-helper-util.service';

@Component({
  selector: 'app-weather-forecast-container',
  templateUrl: './weather-forecast-container.component.html',
  styleUrls: ['./weather-forecast-container.component.scss'],
})
export class WeatherForecastContainerComponent implements OnInit {
  weatherForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customHelperUtilService: CustomHelperUtilService
  ) {}

  ngOnInit(): void {
    this.reloadForm();
  }

  reloadForm(): void {
    const formattedDate = this.customHelperUtilService.getCurrentDate();
    this.weatherForm = this.formBuilder.group({
      date: [formattedDate, [Validators.required]],
    });
    this.loadData();
  }

  loadData() {
    const weatherForm = this.weatherForm.value;
    this.customHelperUtilService.updateDate(weatherForm.date);
  }
}
