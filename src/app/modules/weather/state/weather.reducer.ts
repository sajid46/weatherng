import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as WeatherActions from '../state/weather.actions';

import * as AppState from '../../../state/app.state';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface WeatherState extends AppState.state {
  city: any[];
  weather: any[];
}

const initialState = {
  city: [],
  weather: [],
};

const getWeatherFeatureState = createFeatureSelector<WeatherState>('weather');
export const getWeather = createSelector(
  getWeatherFeatureState,
  (state) => state.weather[state.weather.length - 1]
);

// export const loadWeather = createSelector(
//   getWeatherFeatureState,
//   (state) => state.weather.filter(x => x.city == 'crawley')
// );

export const WeatherReducer = createReducer<WeatherState>(
  initialState,
  on(WeatherActions.loadWeather, (state, action): WeatherState => {
    return {
      ...state,
      weather: state.weather,
      city: state.city
    };
  }),
  on(WeatherActions.getWeatherSuccess, (state, action): WeatherState => {
    return {
      ...state,
      city: [...state.city, action.city],
      weather: [...state.weather, action.weather],
    };
  })
);
