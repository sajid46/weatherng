import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { state } from '../../../state/app.state';

import * as WeatherActions from '../state/weather.actions';
import { getWeather } from './weather.reducer';

@Injectable({
    providedIn: 'root' // just before your class
  })
export class WeatherFacade {
  getWeather$ = this.store.pipe(select(getWeather));
  loadWeather$ = this.store.pipe(select(getWeather));

  getWeather(city: string): void {
    this.store.dispatch(WeatherActions.getWeather({ city: city }));
  }

  loadWeather(city: string): void {
    this.store.dispatch(WeatherActions.loadWeather({ city: city }));
  }

  constructor(private store: Store<state>) {}
}
