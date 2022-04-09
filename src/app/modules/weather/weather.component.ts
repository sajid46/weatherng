import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICities } from 'src/app/model/select-cities.model';
import { AppService } from 'src/app/shared/services/app.service';
import { DataServiceService } from 'src/app/shared/services/data-service.service';
import { state } from 'src/app/state/app.state';
import * as WeatherActions from '../weather/state/weather.actions';
import { WeatherFacade } from './state/weather.facade';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather$: Observable<any> | undefined;
  city$: Observable<any> | undefined;

  Sunrisehours = '';
  Sunriseminutes = '';
  sunriseHR$: Observable<any> | undefined;
  sunriseMIN$: Observable<any> | undefined;
  sunsetHR$: Observable<any> | undefined;
  sunsetMIN$: Observable<any> | undefined;

  sunsetTime$: Observable<any> | undefined;

  weatherImg = '';
  sunriseHRNew = '';
  sunriseMINNew = '';
  ShowCityInput = true;
  selectCities: ICities[] | undefined;

  ngOnInit(): void {
    this.getCitiesDropDown();
    this.getWeather('Crawley, West Sussex');
  }

  private getCitiesDropDown() {
    this.selectCities = this.dataService.getSelectCities();
    this.selectCities.sort((a) => (a.name < a.country ? 1 : -1));
  }

  getWeatherImage(weather$: Observable<any>): string {
    weather$.subscribe((p) => (this.weatherImg = p.weather[0].main));

    return this.weatherImg.toUpperCase() === 'DRIZZLE'
      ? 'rain'
      : this.weatherImg.toLowerCase();
  }

  private loadWeather(citySelected: string) {
    this.weather$ = this.weatherFacade.loadWeather$;
    this.weatherFacade.loadWeather();
    this.weatherImg = this.getWeatherImage(this.weather$);
  }

  private getWeather(citySelected: string) {
    this.weather$ = this.weatherFacade.getWeather$;
    this.city$ = this.weatherFacade.loadCity$;
    this.weatherFacade.getWeather(citySelected);
    this.weatherImg = this.getWeatherImage(this.weather$);
  }

  cityEvent($event: any): void {
    //this.loadWeather($event);
    this.getWeather($event);
  }

  citySelectedEvent($event: any): void {
    // this.combileLatest($event);
    this.getWeather($event);
  }

  combileLatest(city: any) {
    this.weather$ = this.weatherFacade.loadWeather$
      .pipe(map((cs) => cs.filter((c) => c.name === city)))
      .pipe(tap((t) => console.log(t)));

    // combineLatest([this.weather$, city])?.pipe(
    //   map(w =>
    //     w.forEach((element: any) => {
    //       if(element.name.toLowerCase() == city.toLowerCase())
    //       {
    //         console.log(element);
    //         this.weather$ = element;
    //       }
    //     })
    //   )
    // );

  }

  constructor(
    private dataService: DataServiceService,
    private weatherFacade: WeatherFacade,
    private store: Store<state>
  ) {}
}
