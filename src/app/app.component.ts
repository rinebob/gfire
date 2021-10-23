import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirebaseService } from './firebase.service';
import { Equity, Item, Option } from './common/interfaces';



@Component({
  selector: 'gf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnChanges, OnInit {

  equity: Equity = new Equity();
  submitted = false;
  equities?: Equity[];
  currentEquity: Equity = {
    symbol: '',
    published: false,
  };
  currentIndex = -1;
  symbol = '';
  
  message = '';
  
  constructor(private readonly equitiesService: FirebaseService) {
    
  }

  ngOnInit() {
    this.message = '';
    this.getEquities();
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentEquity = { ...this.equity };
  }

  saveEquity(): void {
    this.equitiesService.createEquity(this.equity).then(() => {
      console.log('a sE equity saved dude!');
      this.submitted = true;
    });
  
  }

  newEquity(): void {
    this.submitted = false;
    this.equity = new Equity();
  }

  getEquities() {
    this.equitiesService.getAllEquities().snapshotChanges()
    .pipe(
      map(changes => changes.map(change => ({id: change.payload.doc.id, ...change.payload.doc.data()})))
    )
    .subscribe( data => {this.equities = data;});
  }

  setActiveEquity(equity: Equity, index: number): void {
    this.currentEquity = equity;
    this.currentIndex = index;
  }

  refreshList(): void {
    this.currentEquity = {};
    this.currentIndex = -1;
    this.getEquities();
  }

  updatePublished(status: boolean): void {
    if (this.currentEquity?.id) {
      this.equitiesService.updateEquity(this.currentEquity.id, { published: status })
      .then(() => {
        this.currentEquity.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateEquity(): void {
    const data = {
      symbol: this.currentEquity.symbol,
    };

    if (this.currentEquity.id) {
      this.equitiesService.updateEquity(this.currentEquity.id, data)
        .then(() => this.message = 'The equity was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteEquity(): void {
    if (this.currentEquity.id) {
      this.equitiesService.deleteEquity(this.currentEquity.id)
        .then(() => {
          this.refreshList();
          this.message = 'The equity was deleted successfully!';
        })
        .catch(err => console.log(err));
    }
  }


}
