import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppService } from 'src/app/shared/services/app.service';

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
  img$: Observable<any> | undefined;
  timeNow = new Date();
  weatherImg = '';
  sunriseHRNew = '';
  sunriseMINNew = '';

  constructor(
    private render: Renderer2,
    private elem: ElementRef,
    private service: AppService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.city = 'crawley';
    this.weather$ = this.service.loadWeather(this.city);

    this.setSunRiseAndSunset(this.weather$);

    this.img$ = this.weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunset)))
      .pipe(tap((x) => console.log('Time:' + x.getDate())));

      this.timeNow= new Date();

      this.weatherImg = this.getWeatherImage(this.weather$);
    
    
  }

  getWeatherImage(weather$: Observable<any> ): string
  {
    weather$
    .subscribe(p => this.weatherImg = p.weather[0].main);
    
    this.timeNow= new Date();
    
    return  this.weatherImg.toUpperCase() === "DRIZZLE" ? "rain" :  this.weatherImg.toLowerCase();
  }

  setSunRiseAndSunset(weather$: Observable<any> ): void {
     weather$
    .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
    .pipe(
      map((m) => this.sunriseHRNew = (m.getHours() < 10 ? '0' + m.getHours() : m.getHours()).toString())
    );
    
    weather$
    .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
    .pipe(
      map((m) => this.sunriseMINNew = (m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()).toString())
    );
    

    
    
    this.sunriseHR$ = weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map((m) => (m.getHours() < 10 ? '0' + m.getHours() : m.getHours()))
      );
    this.sunriseMIN$ = weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map((m) => m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()
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
        map((m) => m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()
        )
      );
  }

  cityChanged() {}

  onSubmit() {
    this.city = this.myForm?.controls.city.value;
    this.weather$ = this.service.loadWeather(this.city);
  
    this.weatherImg = this.getWeatherImage(this.weather$);

    
  }
}
