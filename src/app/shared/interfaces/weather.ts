import { ChartObj } from './chart-obj';

export interface Weather {
    consolidated_weather: WeatherDay[];
    sun_set: Date;
    chart: ChartObj;
    next_sun_rise: Date;
    sun_rise: Date;
    after_sun_set: boolean;
    title: string;
}

export interface WeatherDay {
    applicable_date: Date;
    min_temp: number;
    max_temp: number;
    the_temp: number;
    weather_state_name: string;
    day: string;
}
