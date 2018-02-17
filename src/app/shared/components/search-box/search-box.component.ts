import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
                   (keyup.enter)="submit()"
                   [ngbTypeahead]="searchResults"
                   (selectItem)="submit($event)"
                   [placeholder]="placeholder" autofocus/>

            <span class="input-group-btn">
                <button class="btn outline-grey-1"
                        (click)="submit()">Update</button>
            </span>
        </div>
    `,
    styleUrls: ['./search-box.component.less']
})
export class SearchBoxComponent implements OnInit {

    public query = '';
    public searchResults: any;

    @Input() searchList: string[];
    @Input() placeholder: string;

    @Output() searchQuery = new EventEmitter<any>();

    constructor(private el: ElementRef) {
        this.searchResults = (text$: Observable<string>) =>
            text$
              .debounceTime(200)
              .distinctUntilChanged()
              .map(query => query.length < 1 ? []
                  : this.searchList.filter(v => v.toLowerCase().indexOf(query.toLowerCase()) > -1).slice(0, 10));
    }

    submit(query?: { item: string }): void {
        if (query) { this.query = query.item; }
        this.searchQuery.emit(this.query);
        this.query = '';
    }

    ngOnInit() {
    }

}
