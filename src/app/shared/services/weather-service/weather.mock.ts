import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Weather } from '../../interfaces/weather';

const weather: Weather = {
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

export class MockWeatherService {

    getWeather(location): Observable<Weather> {
        weather.title = location;
        return Observable.of(weather);
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
};

