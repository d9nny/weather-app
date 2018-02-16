import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service/weather.service';

@Component({
    selector: 'app-weather-dashboard',
    templateUrl: './weather-dashboard.component.html',
    styleUrls: ['./weather-dashboard.component.less']
})
export class WeatherDashboardComponent implements OnInit {

    public weather: any;
    public theme: string;
    public error: boolean;
    public locationError: boolean;

    constructor(private weatherService: WeatherService) {}

    getWeather(location) {
        this.error = this.locationError = false;
        this.weatherService.getWeather(location)
            .subscribe(
                res => {
                    console.log(res);
                    this.weather = res;
                },
                err => {
                    err === 'unknown-location' ? this.locationError = true :
                                                 this.error = true;
                });
    }

    ngOnInit() {
        this.getWeather('london');
    }
}
