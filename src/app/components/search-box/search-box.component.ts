import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-search-box',
    template: `
        <div class="input-group">
            <input type="text"
                   [(ngModel)]="query"
                   class="form-control"
                   (keyup.enter)="search()"
                   placeholder="Search location..." autofocus>
            <span class="input-group-btn">
                <button class="btn outline-grey-1"
                        (click)="search()">Update</button>
            </span>
        </div>
    `,
    styleUrls: ['./search-box.component.less']
})
export class SearchBoxComponent implements OnInit {

    public query = '';
    private querySubject = new Subject<string>();

    @Output() searchQuery = new EventEmitter<any>();

    constructor(private el: ElementRef) {
        // Observable.fromEvent(this.el.nativeElement, 'keyup')
        //     .map((e: any) => e.target.value)
        //     .subscribe(query => {
        //         this.query = query;
        //         this.searchQuery.emit(this.query);
        //     });
    }

    search() {
        this.searchQuery.emit(this.query);
        this.query = '';
    }

    ngOnInit() {
    }

}
