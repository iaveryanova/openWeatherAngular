import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { WeatherService } from 'src/app/shared/service/weather.service';
import { IForecast } from '../../shared/model/forecast.model';
import { IForecast2 } from '../../shared/model/forecast2.model';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss']
})
export class FiveDayForecastComponent implements OnInit, OnChanges {

  @Input() forecastWeather!: IForecast;
  @Input() cityName: string = '';
  @Input() arrayResponse!: IForecast2;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

  }

  getImage(iconCode: string) {
    return `http://openweathermap.org/img/w/${iconCode}.png`
  }

  getRounding (number: number) {
    return Math.round(number);
  }

  getTime(unix_timestamp: number) {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ':' + minutes.slice(-2);
    return formattedTime;
  }

  getTomorrow(unix_timestamp: number) {
    let nowDate = new Date(unix_timestamp * 1000);
    let tomorrow = nowDate.setDate(nowDate.getDate() + 1);
    let tomorrow_zero = nowDate.setHours(0);
    return nowDate.getTime() / 1000;


  }

  getDate(unix_timestamp: number) {
    let date = new Date(unix_timestamp * 1000);

    return date.toLocaleDateString();
  }
}

