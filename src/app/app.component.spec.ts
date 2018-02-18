import { TestBed, async } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular-highcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';
import { ChartComponent } from './shared/components/chart/chart.component';
import { CountdownTimerComponent } from './shared/components/countdown-timer/countdown-timer.component';
import { SearchBoxComponent } from './shared/components/search-box/search-box.component';

import { WeatherService } from './shared/services/weather-service/weather.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpModule,
                ChartModule,
                NgbModule
            ],
            declarations: [
                AppComponent,
                WeatherDashboardComponent,
                ChartComponent,
                CountdownTimerComponent,
                SearchBoxComponent
            ],
            providers: [
                WeatherService
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app works!'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app works!');
    }));
});
