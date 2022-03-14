import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICities } from 'src/app/model/select-cities.model';
import { AppService } from 'src/app/shared/services/app.service';
import { DataServiceService } from 'src/app/shared/services/data-service.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  @Input() weather$: Observable<any> | undefined;
  @Input() sunriseHR$: Observable<any> | undefined;
  @Input() sunriseMIN$: Observable<any> | undefined;
  @Input() sunsetHR$: Observable<any> | undefined;
  @Input() sunsetMIN$: Observable<any> | undefined;

  @Input() sunsetTime$: Observable<any> | undefined;
  
  timeNow = new Date();
  @Input() weatherImg = '';
  @Input() sunriseHRNew = '';
  @Input() sunriseMINNew = '';
  @Input() ShowCityInput = false;
  @Input() selectCities: ICities[] | undefined;

  @Output() cityEvent=new EventEmitter<string>();

  citySelected = "SelectaCity";
  
  city: string = '';
  myForm = this.fb.group({
    city: new FormControl('', []),
  });


  constructor(
    private service: AppService,
    private dataService: DataServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.city = this.myForm?.controls.city.value;
    // this.citySelected = this.myForm?.controls.select.value;

    // this.weather$ = this.service.loadWeather(this.city);
    this.weatherImg = this.getWeatherImage(this.weather$);

    this.setSunRiseAndSunset(this.weather$);
    this.ShowCityInput=false;
    this.citySelected = "SelectaCity";

    this.cityEvent.emit(this.city);

    
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

  getWeatherImage(weather$: Observable<any> | undefined): string {
    if(weather$ != undefined)
    {
    weather$.subscribe((p) => (this.weatherImg = p.weather[0].main));
  }
    this.timeNow = new Date();

    return this.weatherImg.toUpperCase() === 'DRIZZLE'
      ? 'rain'
      : this.weatherImg.toLowerCase();
  }

  setSunRiseAndSunset(weather$: Observable<any> | undefined): void {
    if(weather$ != undefined)
    {
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

      // this.sunsetTime$ = weather$
      // .pipe(map((p) => new Date(p.sys.sunset * 1000 )));

      //  weather$
      // .pipe(map(p => p.timezone / 24 ))
      // .subscribe(x => console.log(x));
  }
}
