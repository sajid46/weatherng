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
import { WeatherService } from 'src/app/services/weather.service';

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

  constructor(
    private render: Renderer2,
    private elem: ElementRef,
    private service: WeatherService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.city = 'crawley';
    this.weather$ = this.service.loadWeather(this.city);

    this.sunriseHR$ = this.weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map((m) => (m.getHours() < 10 ? '0' + m.getHours() : m.getHours()))
      );
    this.sunriseMIN$ = this.weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunrise)))
      .pipe(
        map((m) =>
          m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()
        )
      );

    this.sunsetHR$ = this.weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunset)))
      .pipe(
        map((m) => (m.getHours() < 10 ? '0' + m.getHours() : m.getHours()))
      );
    this.sunsetMIN$ = this.weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunset)))
      .pipe(
        map((m) =>
          m.getMinutes() < 10 ? '0' + m.getMinutes() : m.getMinutes()
        )
      );

    this.img$ = this.weather$
      .pipe(map((p) => new Date(1000 * p.sys.sunset)))
      .pipe(tap((x) => console.log('Time:' + x.getDate())));

      this.timeNow= new Date();
    const t = this.img$;
  }

  cityChanged() {}

  onSubmit() {
    this.city = this.myForm?.controls.city.value;
    this.weather$ = this.service.loadWeather(this.city);
  }
}
