import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseURL: any;
  data: any[] | undefined;

  constructor(private http: HttpClient) {}

  loadWeather(city: string): Observable<any> {
    var data = this.http.get<any>(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=7de63d638276a9f69a79870331bfbccf'
    );

    return data;
  }

  getDetailedWeather(lat: string, lon: string) {
    var url =
      'https://api.openweathermap.org/data/2.5/onecall?lat=' +
      lat +
      '&lon=' +
      lon +
      'exclude=minutely&appid=7de63d638276a9f69a79870331bfbccf';
    return this.http.get<any>(url);
  }
}
