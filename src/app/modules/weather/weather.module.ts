import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindDirectionPipe } from 'src/app/pipes/wind-direction.pipe';
import { StoreModule } from '@ngrx/store';
import { WeatherReducer } from './state/weather.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffect } from './state/weather.effect';
import { TemparatureCelciusPipe } from 'src/app/pipes/temparature-celcius.pipe';
import { WeatherComponent } from './weather.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

const routes: Routes = [{ path: '', component: WeatherComponent }];

@NgModule({
  declarations: [
    TemparatureCelciusPipe,
    WindDirectionPipe,
    WeatherComponent,
    WeatherDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('weather', WeatherReducer),
    EffectsModule.forFeature([WeatherEffect])
  ],
})
export class WeatherModule {}
