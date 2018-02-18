import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { Weather, WeatherDay } from '../../interfaces/weather';
import { ChartObj } from '../../interfaces/chart-obj';

@Injectable()
export class WeatherService {

    constructor(private http: Http) { }

    getWeather(location): Observable<Weather> {
        return this.http.get(`http://interview.toumetisanalytics.com/location/${ location }`)
            .switchMap( data => {
                if (data.json().length) {
                    const woeid = data.json()[0].woeid;
                    return this.http.get(`http://interview.toumetisanalytics.com/weather/${ woeid }`);
                } else {
                    return Observable.throw('unknown-location');
                }
            })
            .map(data => this.processWeather(data.json()));
    }

    processWeather(weather: any): Weather {
        weather.next_sun_rise = this.getNextSunRise(weather.sun_rise);
        weather.after_sun_set = this.afterSunSet(weather.sun_set);
        weather.consolidated_weather = this.setupWeatherDays(weather.consolidated_weather);
        weather.consolidated_weather = weather.consolidated_weather.sort((a, b) => {
            return a.applicable_date - b.applicable_date;
        });
        weather.chart = this.createChartData(weather.consolidated_weather);
        return weather;
    }

    getNextSunRise(sunrise: Date): Date {
        const sunriseTomorrow = new Date(sunrise);
        sunriseTomorrow.setHours(sunriseTomorrow.getHours() + 24);
        return sunriseTomorrow;
    }

    afterSunSet(sunset: Date): Boolean {
        return new Date().getTime() > new Date(sunset).getTime();
    }

    setupWeatherDays(weatherDays: any[]): WeatherDay[] {
        weatherDays.forEach(weatherDay => {
            const date = `${ weatherDay.applicable_date }`.split('-').map(num => Number(num));
            weatherDay.applicable_date = new Date(date[0], date[1] - 1, date[2]);
            weatherDay.day = this.getDay(weatherDay);
        });
        return weatherDays;
    }

    getDay(weather: WeatherDay): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[weather.applicable_date.getDay()];
    }

    createChartData(weatherDays: WeatherDay[]): ChartObj {
        const data = {
            categories: [],
            series: [
                { name: 'Max Temp', color: '#FC466B', data: [] },
                { name: 'Avg Temp', color: '#9d52b5', data: [] },
                { name: 'Min Temp', color: '#3F5EFB', data: [] }
            ]
        };
        weatherDays.forEach(weatherDay => {
            data.categories.push(weatherDay.day);
            data.series[0].data.push(weatherDay.max_temp);
            data.series[1].data.push((weatherDay.max_temp + weatherDay.min_temp) / 2);
            data.series[2].data.push(weatherDay.min_temp);
        });
        return data;
    }

    getLocations() {
        return ['London', 'Bristol', 'Exeter', 'Tiverton', 'Liverpool', 'Reading', 'Birmingham', 'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
        'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    }
}
