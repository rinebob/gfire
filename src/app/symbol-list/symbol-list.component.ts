import { Component, OnChanges, EventEmitter, OnInit, ChangeDetectionStrategy, Input, Output, SimpleChanges } from '@angular/core';

import { map } from 'rxjs/operators';

import { FirebaseService } from '../firebase.service';
import { Equity, Option } from '../common/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { INITIAL_EQUITY } from '../common/constants';


@Component({
  selector: 'gf-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolListComponent implements OnChanges, OnInit {

  @Input() equities: Equity[] = [];
  @Output() currentEquity: EventEmitter<Equity> = new EventEmitter();

 
  currentIndex = -1;
  symbol = '';

  equitiesBS = new BehaviorSubject<Equity[]>([]);
  equities$: Observable<Equity[]> = this.equitiesBS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['equities']) {
      this.equitiesBS.next(changes['equities'].currentValue);

    }
  }

  ngOnInit(): void {
  
  }

  setActiveEquity(equity: Equity): void {
    console.log('sL sAE set active equity: ', equity.symbol)
    this.currentEquity.emit(equity);
  }

}
