import { Component, OnInit } from '@angular/core';
import { WeatherService } from './shared/service/weather.service';
import { IWeather } from './shared/model/weather.model';
import { IForecast } from './shared/model/forecast.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cityName: string = '';
  currentWeather!: IWeather;
  forecastWeather!: IForecast;
  // flag: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
  }

  getWeather(cityName: string) {
    this.weatherService.flag = false;
    this.weatherService.getWeatherbyCityName(this.cityName).subscribe((response: IWeather) => {
      this.currentWeather = response;
      console.log(response);
    })
  }


}
