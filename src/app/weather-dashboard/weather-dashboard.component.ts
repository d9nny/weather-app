import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../shared/services/weather-service/weather.service';

import { Weather, WeatherDay } from '../shared/interfaces/weather';

@Component({
    selector: 'app-weather-dashboard',
    templateUrl: './weather-dashboard.component.html',
    styleUrls: ['./weather-dashboard.component.less']
})
export class WeatherDashboardComponent implements OnInit {

    public weather: Weather;
    public locations: string[];
    public error: boolean;
    public locationError: boolean;

    constructor(private weatherService: WeatherService) {}

    getWeather(location): void {
        this.error = this.locationError = false;
        this.weatherService.getWeather(location)
            .subscribe(
                (res: Weather) => this.weather = res,
                (err) => {
                    err === 'unknown-location' ? this.locationError = true :
                                                 this.error = true;
                });
    }

    ngOnInit() {
        this.getWeather('london');
        this.locations = this.weatherService.getLocations();
    }
}
