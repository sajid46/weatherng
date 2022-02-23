import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Weather } from 'src/app/model/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather$: Observable<any> | undefined;
  
  city: string = '';
  
  myForm = this.fb.group({
    city: new FormControl('', []),
  });

  constructor(private service: WeatherService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.weather$ = this.service.loadWeather('istanbul');
    
  }

  cityChanged() {}

  onSubmit() {
    this.city = this.myForm?.controls.city.value;
    this.weather$ = this.service.loadWeather(this.city);
  }
}
