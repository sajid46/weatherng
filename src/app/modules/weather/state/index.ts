import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as AppState from '../../../state/app.state';

export interface WeatherState extends AppState.state {
    city: any[];
    weather: any[];
  }

const getWeatherFeatureState = createFeatureSelector<WeatherState>('weather');
export const getWeather = createSelector(
  getWeatherFeatureState,
  (state) => state.weather[state.weather.length - 1]
);

export const loadCity = createSelector(getWeatherFeatureState, (state) => state.city)

export const loadWeatherSlice = createSelector(
  getWeatherFeatureState, 
  (state) => state.weather
);