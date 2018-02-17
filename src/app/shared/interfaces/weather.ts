import { ChartObj } from './chart-obj';

export interface Weather {
    consolidated_weather: WeatherDay[];
    sun_set: Date;
    the_temp: number;
    weather_state_name: string;
    chart: ChartObj;
    next_sun_rise: Date;
    after_sun_set: boolean;
}

export interface WeatherDay {
    applicable_date: Date;
    min_temp: number;
    max_temp: number;
    day: string;
}
