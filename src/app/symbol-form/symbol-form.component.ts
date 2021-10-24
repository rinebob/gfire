import { Component, EventEmitter, OnDestroy, OnInit, ChangeDetectionStrategy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from '../firebase.service';

import { takeUntil } from 'rxjs/operators';

import { Equity } from '../common/interfaces';
import { Subject } from 'rxjs';
import { INITIAL_EQUITY } from '../common/constants';


@Component({
  selector: 'gf-symbol-form',
  templateUrl: './symbol-form.component.html',
  styleUrls: ['./symbol-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolFormComponent implements OnDestroy, OnInit {
  readonly destroy = new Subject();
  @Output() addEquity: EventEmitter<Equity> = new EventEmitter();

  equity: Equity = new Equity();
  submitted = false;

  symbolControl = new FormControl('');
  symbolForm = new FormGroup({
    'symbolControl': this.symbolControl,
  });

  constructor() {
    this.symbolControl.valueChanges.pipe(takeUntil(this.destroy))
    .subscribe(
      value => console.log('sF ctor symbol control value: ', value)
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  saveEquity(): void {
    const value = this.symbolControl.value;
    console.log('sF ctor symbol control value: ', value)
    const equity = INITIAL_EQUITY;
    equity.symbol = this.symbolControl.value;
    this.addEquity.emit(equity);
    this.submitted = true;
  
    
  
  }

  resetEquity(): void {
    this.submitted = false;
    this.equity = new Equity();
    this.symbolControl.setValue('');
  }

}
