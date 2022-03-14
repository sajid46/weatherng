import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction(
  '[Load Weather] Load City Weather',
  props<{ city: string }>()
);