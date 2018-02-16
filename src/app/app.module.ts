import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular-highcharts';


import { AppComponent } from './app.component';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

import { WeatherService } from './weather-service/weather.service';


@NgModule({
    declarations: [
        AppComponent,
        WeatherDashboardComponent,
        ChartComponent,
        CountdownTimerComponent,
        SearchBoxComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChartModule
    ],
    providers: [
        WeatherService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
