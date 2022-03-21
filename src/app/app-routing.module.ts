import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeatherComponent } from './modules/weather/weather.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    loadChildren: () =>
      import('./modules/weather/weather.module').then((m) => m.WeatherModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
