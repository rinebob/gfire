import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Equity } from '../common/interfaces';
import { INITIAL_EQUITY } from '../common/constants';
import { PICKER_TABLE_DATA } from 'src/data/picker-table-data';

@Component({
  selector: 'gf-symbol-detail',
  templateUrl: './symbol-detail.component.html',
  styleUrls: ['./symbol-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolDetailComponent implements OnChanges, OnInit {
  @Input()
  set equity(value: Equity) {
    this.currentEquityBS.next(value);
    console.log('sD input equity: ', value);
  }
  get equity() {
    return this.currentEquityBS.value;
  }

  @Output() refreshList: EventEmitter<boolean> = new EventEmitter();
  @Output() addEquity: EventEmitter<Equity> = new EventEmitter();
  @Output() equityToUpdate: EventEmitter<Equity> = new EventEmitter()
  @Output() equityToDelete: EventEmitter<string> = new EventEmitter()

  currentEquityBS = new BehaviorSubject<Equity>(INITIAL_EQUITY);
  currentEquity$: Observable<Equity> = this.currentEquityBS;

  symbolControl = new FormControl('');
  symbolForm = new FormGroup({
    'symbolControl': this.symbolControl,
  });

  startIndexControl = new FormControl('');
  endIndexControl = new FormControl('');
  symbolGeneratorForm = new FormGroup({
    'startIndexControl': this.startIndexControl,
    'endIndexControl': this.endIndexControl,
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

  saveEquity(): void {
    if (!this.symbolControl.value) return;
    
    const value = this.symbolControl.value;
    // console.log('sD sE symbol control value: ', value)
    const equity = INITIAL_EQUITY;
    equity.symbol = this.symbolControl.value;
    
    // console.log('sD sE equity to add: ', equity)

    this.addEquity.emit(equity);
    this.resetEquity();
  }

  updateEquity(): void {
    const data = {
      id: this.currentEquityBS.value.id,
      symbol: this.symbolControl.value,
    };
    // console.log('sD uE update equity data: ', data);
    this.equityToUpdate.emit(data);
    this.resetEquity();
  }

  deleteEquity(): void {
    // console.log('sD dE equity to delete: ', this.currentEquityBS.value.id);
    this.equityToDelete.emit(this.currentEquityBS.value.id);
    this.resetEquity();
  }

  resetEquity(): void {
    this.equity = new Equity();
    this.symbolControl.setValue('');
  }

  generateSymbols() {
    const startIndex = this.startIndexControl.value;
    const endIndex = this.endIndexControl.value;
    console.log('sD gS start/end: ', startIndex, endIndex);
    // .slice(0, numSymbols
    // for (const value of PICKER_TABLE_DATA.values()) {
    //   console.log(value);

    // }

    PICKER_TABLE_DATA.slice(startIndex, endIndex).forEach(datum => {
      console.log('sD gS symbol: ', datum.symbol);
      console.log('sD gS datum: ', datum);
      const equity: Equity = INITIAL_EQUITY;
      equity.symbol = datum.symbol;
      equity.name = datum.company;

      this.addEquity.emit(equity);


    })

  }

}
