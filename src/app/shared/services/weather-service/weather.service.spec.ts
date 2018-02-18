import { TestBed, inject, fakeAsync, async, getTestBed, tick } from '@angular/core/testing';
import { HttpModule, Http, ConnectionBackend, XHRBackend, RequestOptions,
         Response, BaseRequestOptions, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WeatherService } from './weather.service';
import { MockWeatherService } from './weather.mock';

import { Weather } from '../../interfaces/weather';

describe('WeatherService', () => {
    let injector: TestBed,
        service: WeatherService,
        mockBackend;

    const initialWeather = {
        'consolidated_weather': [
            {'weather_state_name': 'Heavy Cloud', 'applicable_date': '2018-02-18', 'min_temp': 3.5159999999999996, 'max_temp': 11.284, 'the_temp': 11.07, },
            {'weather_state_name': 'Light Rain', 'applicable_date': '2018-02-19', 'min_temp': 6.098, 'max_temp': 9.954, 'the_temp': 7.9350000000000005, },
            {'weather_state_name': 'Showers', 'applicable_date': '2018-02-20', 'min_temp': 3.198, 'max_temp': 8.494, 'the_temp': 7.319999999999999, },
            {'weather_state_name': 'Light Rain', 'applicable_date': '2018-02-21', 'min_temp': 0.8699999999999999, 'max_temp': 6.470000000000001, 'the_temp': 5.015, },
            {'weather_state_name': 'Light Cloud', 'applicable_date': '2018-02-22', 'min_temp': 0.24749999999999994, 'max_temp': 6.914, 'the_temp': 5.18, },
            {'weather_state_name': 'Showers', 'applicable_date': '2018-02-23', 'min_temp': -0.8200000000000001, 'max_temp': 5.316000000000001, 'the_temp': 2.64, }
        ],
        'sun_rise': new Date('2018-02-18T07:08:44.138203Z'),
        'sun_set': new Date('2018-02-18T17:20:54.350821Z'),
        'title': 'London',
    },
    weather: Weather = {
        'consolidated_weather': [
            {'weather_state_name': 'Heavy Cloud', 'applicable_date': new Date('2018-02-18T00:00:00.000Z'), 'min_temp': 3.5159999999999996, 'max_temp': 11.284, 'the_temp': 11.07, 'day': 'Sunday'},
            {'weather_state_name': 'Light Rain', 'applicable_date': new Date('2018-02-19T00:00:00.000Z'), 'min_temp': 6.098, 'max_temp': 9.954, 'the_temp': 7.9350000000000005, 'day': 'Monday'},
            {'weather_state_name': 'Showers', 'applicable_date': new Date('2018-02-20T00:00:00.000Z'), 'min_temp': 3.198, 'max_temp': 8.494, 'the_temp': 7.319999999999999, 'day': 'Tuesday'},
            {'weather_state_name': 'Light Rain', 'applicable_date': new Date('2018-02-21T00:00:00.000Z'), 'min_temp': 0.8699999999999999, 'max_temp': 6.470000000000001, 'the_temp': 5.015, 'day': 'Wednesday'},
            {'weather_state_name': 'Light Cloud', 'applicable_date': new Date('2018-02-22T00:00:00.000Z'), 'min_temp': 0.24749999999999994, 'max_temp': 6.914, 'the_temp': 5.18, 'day': 'Thursday'},
            {'weather_state_name': 'Showers', 'applicable_date': new Date('2018-02-23T00:00:00.000Z'), 'min_temp': -0.8200000000000001, 'max_temp': 5.316000000000001, 'the_temp': 2.64, 'day': 'Friday'}
        ],
        'sun_rise': new Date('2018-02-18T07:08:44.138203Z'),
        'sun_set': new Date('2018-02-18T17:20:54.350821Z'),
        'title': 'London',
        'next_sun_rise': new Date('2018-02-19T07:08:44.138Z'),
        'after_sun_set': false,
        'chart': {
            'categories': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'series': [
                {'name': 'Max Temp', 'color': '#FC466B', 'data': [11.284, 9.954, 8.494, 6.470000000000001, 6.914, 5.316000000000001 ] },
                {'name': 'Avg Temp', 'color': '#9d52b5', 'data': [7.4, 8.026, 5.846, 3.6700000000000004, 3.5807499999999997, 2.248 ] },
                {'name': 'Min Temp', 'color': '#3F5EFB', 'data': [3.5159999999999996, 6.098, 3.198, 0.8699999999999999, 0.24749999999999994, -0.8200000000000001 ] }
            ]
        }
    };


    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                WeatherService,
                Http,
                { provide: ConnectionBackend, useClass: MockBackend},
                { provide: RequestOptions, useClass: BaseRequestOptions},
            ]
        });
    });

    beforeEach(() => {
        injector = getTestBed();
        service = injector.get(WeatherService);
        mockBackend = injector.get(ConnectionBackend) as MockBackend;
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('function: getWeather', () => {
        it('should return an Observable<Weather>', fakeAsync(() => {
            let result: any;

            const responses = {};
            responses['http://interview.toumetisanalytics.com/location/london'] = new Response(new ResponseOptions({body: {woeid: 56789}}));
            responses['http://interview.toumetisanalytics.com/weather/56789'] = new Response(new ResponseOptions({body: weather}));

            service.getWeather('london').subscribe(res => {
                result = res;
            });

            mockBackend.connections.subscribe(connection => {
                const response = responses[connection.request.url];
                connection.mockRespond(response);
            });

            tick();
            expect(weather).toEqual(weather);
        }));
    });

    // describe('function: processWeather', () => {
    //     it('should call getNextSunrise', () => {
    //         const weatherObj = service.processWeather(initialWeather);
    //         expect(weatherObj.next_sun_rise).toEqual(weather.next_sun_rise);
    //     });

    //     it('should call afterSunSet', () => {
    //         const weatherObj = service.processWeather(initialWeather);
    //         expect(weatherObj.after_sun_set).toEqual(weather.after_sun_set);
    //     });

    //     it('should call setupWeatherDays', () => {
    //         const weatherObj = service.processWeather(initialWeather);
    //         expect(weatherObj.consolidated_weather[0].day).toEqual(weather.consolidated_weather[0].day);
    //     });

    //     it('should call createChartData', () => {
    //         const weatherObj = service.processWeather(initialWeather);
    //         expect(weatherObj.chart).toEqual(weather.chart);
    //     });
    // });

    describe('function: getNextSunRise', () => {
        it('should return the next sun rise', () => {
            const date = service.getNextSunRise(initialWeather.sun_rise);
            expect(date).toEqual(weather.next_sun_rise);
        });
    });

    describe('function: afterSunSet', () => {
        it('should return false if the time is after sunset', () => {
            const previousDate = new Date();
            previousDate.setHours(previousDate.getHours() - 24);
            const afterSunSet = service.afterSunSet(previousDate);
            expect(afterSunSet).toEqual(true);
        });

        it('should return true if the time is before sunset', () => {
            const futureDate = new Date();
            futureDate.setHours(futureDate.getHours() + 24);
            const afterSunSet = service.afterSunSet(futureDate);
            expect(afterSunSet).toEqual(false);
        });
    });

    describe('function: setupWeatherDays', () => {
        it('should add the day name and change property applicable_date from a string to a date', () => {
            const weatherDays = service.setupWeatherDays(initialWeather.consolidated_weather);
            expect(weatherDays[0].day).toEqual(weather.consolidated_weather[0].day);
            expect(weatherDays[0].applicable_date).toEqual(weather.consolidated_weather[0].applicable_date);
        });
    });

    describe('function: getDay', () => {
        it('should return the day name', () => {
            const day = service.getDay(weather.consolidated_weather[0]);
            expect(day).toEqual(weather.consolidated_weather[0].day);
        });
    });

    describe('function: createChartData', () => {
        it('should return a chart object', () => {
            const chart = service.createChartData(weather.consolidated_weather);
            expect(chart).toEqual(weather.chart);
        });
    });

    describe('function: getLocations', () => {
        it('should return a list of countries', () => {
            const locations = service.getLocations();
            expect(locations.length).toBeTruthy();
        });
    });
});
