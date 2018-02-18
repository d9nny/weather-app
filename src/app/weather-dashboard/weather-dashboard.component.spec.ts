import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WeatherDashboardComponent } from './weather-dashboard.component';
import { ChartComponent } from '../shared/components/chart/chart.component';
import { CountdownTimerComponent } from '../shared/components/countdown-timer/countdown-timer.component';
import { SearchBoxComponent } from '../shared/components/search-box/search-box.component';

import { WeatherService } from '../shared/services/weather-service/weather.service';
import { MockWeatherService } from '../shared/services/weather-service/weather.mock';


describe('WeatherDashboardComponent', () => {
    let component: WeatherDashboardComponent,
        fixture: ComponentFixture<WeatherDashboardComponent>,
        service,
        compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ChartModule,
                FormsModule,
                HttpModule,
                NgbModule.forRoot()
            ],
            declarations: [
                WeatherDashboardComponent,
                ChartComponent,
                CountdownTimerComponent,
                SearchBoxComponent
            ],
            providers: [
                { provide: WeatherService, useClass: MockWeatherService },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WeatherDashboardComponent);
        component = fixture.debugElement.componentInstance;
        service = fixture.debugElement.injector.get(WeatherService);
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should get locations', () => {
        expect(component.locations).toBeDefined();
    });

    it('should get londons weather', () => {
        expect(component.weather).toBeDefined();
        expect(component.weather.title).toEqual('london');
    });

    describe('function: getWeather', () => {
        it('should get the weather', () => {
            const town = 'exeter';
            component.getWeather(town);
            expect(component.weather.title).toEqual(town);
        });
    });

    it('should render the town as a title', () => {
        const title = component.weather.title;
        expect(compiled.querySelector('#title-container .location').textContent).toContain(title);
    });

    it('should render sundown as the widget title', () => {
        expect(compiled.querySelector('#countdown .title').textContent).toContain('Sundown');
    });

    it('should render sunrise as the widget title', () => {
        component.weather.after_sun_set = true;
        expect(compiled.querySelector('#countdown .title').textContent).toContain('Sundown');
    });

    it('should render the current temp', () => {
        const temp = component.weather.consolidated_weather[0].the_temp;
        expect(compiled.querySelector('#current-temp .value').textContent).toContain(temp);
    });

    it('should render the current weather', () => {
        const weather = component.weather.consolidated_weather[0].weather_state_name;
        expect(compiled.querySelector('#current-weather .value').textContent).toContain(weather);
    });
});
