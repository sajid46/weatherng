import {
  createReducer,
  on,
} from '@ngrx/store';

import { WeatherState} from './index'

const initialState = {
  city: [],
  weather: [],
};

import * as WeatherActions from '../state/weather.actions';

export const WeatherReducer = createReducer<WeatherState>(
  initialState,
  on(WeatherActions.loadWeather, (state, action): WeatherState => {
    return {
      ...state,
      weather: state.weather,
    };
  }),on(WeatherActions.getWeatherSuccess, (state, action): WeatherState => {
    return {
      ...state,
      city: [...state.city, action.city],
      weather: [...state.weather, action.weather],
    };
  })
);
