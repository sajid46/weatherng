import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { TemparatureCelciusPipe } from 'src/app/pipes/temparature-celcius.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindDirectionPipe } from 'src/app/pipes/wind-direction.pipe';
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
  ],
})
export class WeatherModule {}
