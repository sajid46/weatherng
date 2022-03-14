import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICities } from 'src/app/model/select-cities.model';
import { AppService } from 'src/app/shared/services/app.service';
import { DataServiceService } from 'src/app/shared/services/data-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather$: Observable<any> | undefined;

  Sunrisehours = '';
  Sunriseminutes = '';
  sunriseHR$: Observable<any> | undefined;
  sunriseMIN$: Observable<any> | undefined;
  sunsetHR$: Observable<any> | undefined;
  sunsetMIN$: Observable<any> | undefined;

  sunsetTime$: Observable<any> | undefined;
  
  timeNow = new Date();
  weatherImg = '';
  sunriseHRNew = '';
  sunriseMINNew = '';
  citySelected: any;
  ShowCityInput = false;
  selectCities: ICities[] | undefined;

  constructor(
    private render: Renderer2,
    private service: AppService,
    private dataService: DataServiceService,
  ) {}

  ngOnInit(): void {
    this.selectCities = this.dataService.getSelectCities();
    this.selectCities.sort((a) => (a.name < a.country ? 1 : -1));
  }

  getWeatherImage(weather$: Observable<any>): string {
    weather$.subscribe((p) => (this.weatherImg = p.weather[0].main));

    this.timeNow = new Date();

    return this.weatherImg.toUpperCase() === 'DRIZZLE'
      ? 'rain'
      : this.weatherImg.toLowerCase();
  }

  setSunRiseAndSunset(weather$: Observable<any>): void {
    weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map(
          (m) =>
            (this.sunriseHRNew = (
              m.getHours() < 10 ? '0' + m.getHours() : m.getHours()
            ).toString())
        )
      );

    weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map(
          (m) =>
            (this.sunriseMINNew = (
              m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()
            ).toString())
        )
      );

    this.sunriseHR$ = weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map((m) => (m.getHours() < 10 ? '0' + m.getHours() : m.getHours()))
      );
    this.sunriseMIN$ = weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map((m) =>
          m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()
        )
      );

    this.sunsetHR$ = weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunset)))
      .pipe(
        map((m) => (m.getHours() < 10 ? '0' + m.getHours() : m.getHours()))
      );
    this.sunsetMIN$ = weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunset)))
      .pipe(
        map((m) =>
          m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()
        )
      );
  }

  selectChanged() {
    if (this.citySelected.toUpperCase() !== 'OTHER') {
      this.getWeather(this.citySelected);
      this.ShowCityInput = false;
    } else {
      this.ShowCityInput = true;
    }
  }

  private getWeather(citySelected: string) {
    this.weather$ = this.service.loadWeather(citySelected);
    this.weatherImg = this.getWeatherImage(this.weather$);
    this.setSunRiseAndSunset(this.weather$);
  }

  cityEvent($event: any): void{
    this.weather$ = this.service.loadWeather($event);
    
  }
}
