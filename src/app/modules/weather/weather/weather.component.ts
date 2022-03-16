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
import * as WeatherActions from '../state/weather.actions';

import { select, Store } from '@ngrx/store';
import { state } from 'src/app/state/app.state';
import { WeatherFacade } from '../state/weather.facade';

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
  
  ngOnInit(): void {
    this.getCitiesDropDown();
  }

  private getCitiesDropDown() {
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

  private loadWeather(citySelected: string) {
    this.weather$ = this.weatherFacade.loadWeather$;
    this.weatherFacade.loadWeather(citySelected);
    this.weatherImg = this.getWeatherImage(this.weather$);
  }

  private getWeather(citySelected: string) {
    this.weather$ = this.weatherFacade.getWeather$;
    this.weatherFacade.getWeather(citySelected);
    this.weatherImg = this.getWeatherImage(this.weather$);
  }

  cityEvent($event: any): void {
    //this.loadWeather($event);
    this.getWeather($event);
  }

  constructor(
    private dataService: DataServiceService,
    private weatherFacade: WeatherFacade
  ) {}
}
