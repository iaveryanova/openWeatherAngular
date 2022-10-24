import { Component, Input, OnInit } from '@angular/core';
import { IWeather } from '../../shared/model/weather.model';
import { WeatherService } from 'src/app/shared/service/weather.service';
import { IForecast } from '../../shared/model/forecast.model';
import { IForecast2 } from '../../shared/model/forecast2.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-one-day-weather',
  templateUrl: './one-day-weather.component.html',
  styleUrls: ['./one-day-weather.component.scss'],
})
export class OneDayWeatherComponent implements OnInit {
  @Input() currentWeather!: IWeather;
  @Input() cityName: string = '';
  forecastWeather!: IForecast;
  arrayResponse!: IForecast2;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {

  }

  getTime(unix_timestamp: number) {
    const offSet = new Date(unix_timestamp).getTimezoneOffset() * 60 * 1000;
    const curOffSet = (this.currentWeather.timezone * 1000) + offSet;
    let date = new Date((unix_timestamp * 1000) + curOffSet);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let formattedTime = hours + ':' + minutes.slice(-2);
    return formattedTime;
  }

  getImage(iconCode: string) {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }

  // getDate() {
  //   let today = new Date();
  //   let now = today.toLocaleString();
  //   return now;
  // }

  getRounding(number: number) {
    return Math.round(number);
  }

  getForecast(cityName: string) {
    this.weatherService.flag = true;
      this.weatherService
        .getFiveDayForecastbyCityName(this.cityName)
        .subscribe((response: IForecast) => {
          let arr = [];
          let arrDay = [];
          let firstTime = response.list[0].dt;
          let nextDay = this.getTomorrow(firstTime);

          for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt >= nextDay) {
              arr.push({list:arrDay});
              arrDay = [];
              firstTime = response.list[i].dt;
              nextDay = this.getTomorrow(firstTime);
            }

            arrDay.push(response.list[i]);

          }
          console.log(arr);
          this.forecastWeather = response;
          this.arrayResponse = {day:arr};
          console.log(this.arrayResponse);
        });
  }

  public getFlag() {
    return this.weatherService.flag;
  }

  convertSpeedWind(meter_sec: number) {
    return meter_sec * 3.6;
  }

  getTomorrow(unix_timestamp: number) {
    let nowDate = new Date(unix_timestamp * 1000);
    let tomorrow = nowDate.setDate(nowDate.getDate() + 1);
    let tomorrow_zero = nowDate.setHours(0);
    return nowDate.getTime() / 1000;

  }

}
