import { Component, OnInit } from '@angular/core';
import { WeatherService } from './shared/service/weather.service';
import { IWeather } from './shared/model/weather.model';
import { IForecast } from './shared/model/forecast.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cityName: string = '';
  currentWeather!: IWeather;
  forecastWeather!: IForecast;
  isError: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  getWeather() {
    this.weatherService.flag = false;
    this.weatherService.getWeatherbyCityName(this.cityName).subscribe({
      next: (response: IWeather) => {
        this.isError = false;
        this.currentWeather = response;
      },
      error: (err: Error) => {
        this.isError = true;
      },
    });
  }



  public enterCity = new FormGroup({
    city: new FormControl('', [
      Validators.pattern(/^[а-яА-Яa-zA-Z]+$/),
      Validators.required,
    ]),
  });

  public onKeyPress(e: any) {
    if (e.keyCode === 13 && e.target.value) {
      this.cityName = e.target.value;
      this.getWeather();
    }
  }

  public onSubmit(){
    this.cityName = '' + this.enterCity.get('city')?.value;
    this.getWeather();
  }

  get city() {
    return this.enterCity.get('city');
  }

}
