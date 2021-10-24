import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Equity } from '../common/interfaces';
import { INITIAL_EQUITY } from '../common/constants';

@Component({
  selector: 'gf-symbol-detail',
  templateUrl: './symbol-detail.component.html',
  styleUrls: ['./symbol-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolDetailComponent implements OnChanges, OnInit {
  // @Input() equity: Equity = INITIAL_EQUITY;

  @Input()
  set equity(value: Equity) {
    this.currentEquityBS.next(value);
    console.log('sD input equity: ', value);
  }
  get equity() {
    return this.currentEquityBS.value;
  }


  @Output() refreshList: EventEmitter<boolean> = new EventEmitter();
  @Output() updatePublished: EventEmitter<boolean> = new EventEmitter()
  @Output() equityToUpdate: EventEmitter<Equity> = new EventEmitter()
  @Output() equityToDelete: EventEmitter<string> = new EventEmitter()

  currentEquityBS = new BehaviorSubject<Equity>(INITIAL_EQUITY);
  currentEquity$: Observable<Equity> = this.currentEquityBS;

  symbolControl = new FormControl('');
  symbolForm = new FormGroup({
    'symbolControl': this.symbolControl,
  });

  message = '';

  constructor() { }

  ngOnChanges(): void {
    this.message = '';
    this.currentEquityBS.next({...this.equity});
    this.symbolControl.setValue(this.currentEquityBS.value.symbol);
  }

  ngOnInit(): void {
  }

  updatePublishedStatus(status: boolean): void {
    this.updatePublished.emit(status);
    // if (this.currentEquity?.id) {
    //   this.equitiesService.updateEquity(this.currentEquity.id, { published: status })
    //   .then(() => {
    //     this.currentEquity.published = status;
    //     this.message = 'The status was updated successfully!';
    //   })
    //   .catch(err => console.log(err));
    // }
  }

  updateEquity(): void {
    const data = {
      id: this.currentEquityBS.value.id,
      symbol: this.symbolControl.value,
    };
    console.log('sD uE update equity data: ', data);
    this.equityToUpdate.emit(data);
    this.symbolControl.setValue('');

   
  }

  deleteEquity(): void {
    console.log('sD dE equity to delete: ', this.currentEquityBS.value.id);
    this.equityToDelete.emit(this.currentEquityBS.value.id);
    this.symbolControl.setValue('');
  }

}
