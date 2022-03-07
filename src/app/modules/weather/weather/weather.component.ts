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

  city: string = '';

  myForm = this.fb.group({
    city: new FormControl('', []),
  });
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
    private elem: ElementRef,
    private service: AppService,
    private dataService: DataServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectCities = this.dataService.getSelectCities();
    this.selectCities.sort((a) => (a.name < a.country ? 1 : -1));
  }

  
  onSubmit() {
    this.city = this.myForm?.controls.city.value;
    // this.citySelected = this.myForm?.controls.select.value;

    this.weather$ = this.service.loadWeather(this.city);
    this.weatherImg = this.getWeatherImage(this.weather$);

    this.setSunRiseAndSunset(this.weather$);
    
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

      // this.sunsetTime$ = weather$
      // .pipe(map((p) => new Date(p.sys.sunset * 1000 )));

      //  weather$
      // .pipe(map(p => p.timezone / 24 ))
      // .subscribe(x => console.log(x));
  }

  selectChanged() {
    if (this.citySelected.toUpperCase() !== 'OTHER') {
      this.weather$ = this.service.loadWeather(this.citySelected);
      this.weatherImg = this.getWeatherImage(this.weather$);
      this.setSunRiseAndSunset(this.weather$);
      this.ShowCityInput = false;
    } else {
      this.ShowCityInput = true;
    }
  }

  getCOuntries() {}
}
