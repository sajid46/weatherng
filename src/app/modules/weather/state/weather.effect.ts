import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppService } from 'src/app/shared/services/app.service';
import * as WeatherActions from './weather.actions';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root' // just before your class
  })
export class WeatherEffect {
   loadWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getWeather),
      mergeMap((action) =>
        this.service.loadWeather(action.city).pipe(
          map((weather) => WeatherActions.getWeatherSuccess({ weather: weather, city: action.city })),
          catchError((error) => of(WeatherActions.getWeatherFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private service: AppService) {}
}
