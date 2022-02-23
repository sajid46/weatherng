import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseURL: any;
  data: any[] | undefined;

  constructor(private http: HttpClient) {
    this.baseURL = "http://api.openweathermap.org/data/2.5/weather?q=`${city}`&appid=7de63d638276a9f69a79870331bfbccf";
   }

   loadWeather(city: string): Observable<any>{
     var data = this.http.get<any>("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7de63d638276a9f69a79870331bfbccf")
     return data;
   }
}
