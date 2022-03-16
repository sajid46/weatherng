import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction(
  '[Load Weather] Load City Weather',
  props<{ city: any }>()
);

export const getWeather = createAction (
    '[Get Weather] Get Weather for a City',
    props<{city: any}>()
);

export const getWeatherSuccess = createAction(
  "[Get Weather Success] Get Weather Successful",
  props<{weather: any[], city: any[]}>()
);

export const getWeatherFailure = createAction(
  "[Get Weather Failure] Get Weather Fails",
  props<{error: string}>()
);
