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

  // equity: Equity = INITIAL_EQUITY;
  // equities?: Equity[];
  currentIndex = -1;
  // symbol = '';
  message = '';

  equitiesBS = new BehaviorSubject<Equity[]>([]);
  equities$: Observable<Equity[]> = this.equitiesBS;

  currentEquityBS = new BehaviorSubject<Equity>(INITIAL_EQUITY);
  currentEquity$: Observable<Equity> = this.currentEquityBS;
  
  constructor(private readonly equitiesService: FirebaseService) {

    
  }

  ngOnInit() {
    this.message = '';
    this.getEquities();
    
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentEquityBS.next(INITIAL_EQUITY);
  }

  saveEquity(equity: Equity): void {
    this.equitiesService.createEquity(equity).then(() => {
      console.log('a sE equity saved dude!');
      // this.submitted = true;
    });
    this.setCurrentEquity(equity);
  
  }

  // newEquity(): void {
  //   this.submitted = false;
  //   this.equity = new Equity();
  // }

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
    // this.currentIndex = index;
  }

  refreshList(): void {
    this.getEquities();
  }

  updatePublished(status: boolean): void {
    // if (this.currentEquity?.id) {
    //   this.equitiesService.updateEquity(this.currentEquity.id, { published: status })
    //   .then(() => {
    //     this.currentEquity.published = status;
    //     this.message = 'The status was updated successfully!';
    //   })
    //   .catch(err => console.log(err));
    // }
  }

  updateEquity(equity: Equity): void {
    const data = {
      symbol: equity.symbol,
    };

    if (equity.id) {
      this.equitiesService.updateEquity(equity.id, data)
        .then(() => this.message = 'The equity was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteEquity(id: string): void {
    if (id) {
      this.equitiesService.deleteEquity(id)
        .then(() => {
          this.refreshList();
          this.message = 'The equity was deleted successfully!';
        })
        .catch(err => console.log(err));
    }
  }


}
