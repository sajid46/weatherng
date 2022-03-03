import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { TemparatureCelciusPipe } from 'src/app/pipes/temparature-celcius.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindDirectionPipe } from 'src/app/pipes/wind-direction.pipe';

const routes: Routes = [{ path: '', component: WeatherComponent }];

@NgModule({
  declarations: [TemparatureCelciusPipe, WindDirectionPipe, WeatherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WeatherModule {}
