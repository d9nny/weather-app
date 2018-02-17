import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { ChartObj } from '../../interfaces/chart-obj';

@Component({
    selector: 'app-chart',
    template: `<div [chart]="chart"></div>`,
    styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {

    @Input() data: ChartObj;

    private chart: Chart;

    constructor() { }

    ngOnInit() {
        this.chart = new Chart({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.0)'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: this.data.categories,
                crosshair: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: this.data.series
        });
    }

}


