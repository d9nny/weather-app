import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Clock } from '../../interfaces/clock';

@Component({
    selector: 'app-countdown-timer',
    template: `<span class="countdown-timer">{{ clock.hrs | number: '2.0' }}:` +
              `{{ clock.mins | number: '2.0' }} ` +
              `<small>{{ clock.secs | number: '2.0' }}</small></span>`,
    styleUrls: ['./countdown-timer.component.less']
})
export class CountdownTimerComponent implements OnInit {

    @Input() countDownDate: Date;

    @Output() finished: EventEmitter<boolean> = new EventEmitter();

    public clock: Clock = { hrs: 0, mins: 0, secs: 0, distance: 0 };

    private interval: any;

    constructor() {}

    startTimer(): void {
        const now = new Date().getTime(),
              futureTime = new Date(this.countDownDate).getTime();

        this.clock.distance = futureTime - now;

        if (this.clock.distance >= 0) {
            this.interval = setInterval(() => {
                this.clock.hrs  = Math.floor((this.clock.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                this.clock.mins = Math.floor((this.clock.distance % (1000 * 60 * 60)) / (1000 * 60));
                this.clock.secs = Math.floor((this.clock.distance % (1000 * 60)) / 1000);
                this.clock.distance -= 1000;

                if (this.clock.distance < 0) {
                    clearInterval(this.interval);
                    this.finished.emit(true);
                }
            }, 1000);
        }
    }

    ngOnInit() {
        this.startTimer();
    }

}
