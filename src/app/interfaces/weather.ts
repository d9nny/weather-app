import { Chart } from './chart';

export interface Weather {
    consolidated_weather: WeatherDay[];
    sun_set: Date;
    the_temp: number;
    weather_state_name: string;
    chart: Chart;
}

export interface WeatherDay {
    applicable_date: Date;
    min_temp: number;
    max_temp: number;
    day: string;
}
