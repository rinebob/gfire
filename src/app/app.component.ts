import { Component, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirebaseService } from './firebase.service';
import { Equity, Item, Option } from './common/interfaces';
import { INITIAL_EQUITY } from './common/constants';




@Component({
  selector: 'gf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnChanges, OnInit {
  equitiesBS = new BehaviorSubject<Equity[]>([]);
  equities$: Observable<Equity[]> = this.equitiesBS;

  currentEquityBS = new BehaviorSubject<Equity>(INITIAL_EQUITY);
  currentEquity$: Observable<Equity> = this.currentEquityBS;
  
  constructor(private readonly equitiesService: FirebaseService) {
    
  }

  ngOnInit() {
    this.getEquities();
    
  }

  ngOnChanges(): void {
    this.currentEquityBS.next(INITIAL_EQUITY);
  }

  saveEquity(equity: Equity): void {
    console.log('a sE calling save equity: ', equity);

    this.equitiesService.createEquity(equity).then(() => {
      console.log('a sE equity saved dude!  equity: ', equity);
    });
    this.setCurrentEquity(equity);
  
  }

  getEquities() {
    this.equitiesService.getAllEquities().snapshotChanges()
    .pipe(
      map(changes => changes.map(change => ({id: change.payload.doc.id, ...change.payload.doc.data()})))
    )
    .subscribe( data => { this.equitiesBS.next(data) });
  }

  setCurrentEquity(equity: Equity): void {
    console.log('a sCE equity: ', equity.symbol);
    this.currentEquityBS.next(equity);
  }

  refreshList(): void {
    this.getEquities();
  }

  
  updateEquity(equity: Equity): void {
    const data = {
      symbol: equity.symbol,
    };

    if (equity.id) {
      this.equitiesService.updateEquity(equity.id, data)
        .then(() => console.log('a uE eq updated: ', equity.symbol))
        .catch(err => console.log(err));
    }
  }

  deleteEquity(id: string): void {
    if (id) {
      this.equitiesService.deleteEquity(id)
        .then(() => {
          this.refreshList();
          
        })
        .catch(err => console.log(err));
    }
  }


}
