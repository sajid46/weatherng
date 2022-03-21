import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { state } from '../../../state/app.state';

import * as WeatherActions from '../state/weather.actions';
import { loadWeather } from '../state/weather.actions';
import { getWeather, loadCity, loadWeatherSlice } from './index';

@Injectable({
    providedIn: 'root' // just before your class
  })
export class WeatherFacade {
  getWeather$ = this.store.pipe(select(getWeather));
  loadWeather$ = this.store.pipe(select(loadWeatherSlice));
  loadCity$ = this.store.pipe(select(loadCity));

  getWeather(city: string): void {
    this.store.dispatch(WeatherActions.getWeather({ city: city }));
  }

  loadWeather(): void {
    this.store.dispatch(WeatherActions.loadWeather());
  }

  constructor(private store: Store<state>) {}
}
