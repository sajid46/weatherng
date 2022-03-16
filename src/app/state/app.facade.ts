import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { state } from './app.state';
import { Observable } from 'rxjs';
import * as WeatherActions from '../modules/weather/state/weather.actions';
// import { getProductBasketTotal } from '../modules/product/state';

@Injectable()
export class AppFacade {
  constructor(private store: Store<state>) {}

  
}
