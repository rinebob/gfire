import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';

import { Equity, Item, Option } from './common/interfaces';
import {ITEMS_DB_PATH, EQUITIES_DB_PATH, OPTIONS_DB_PATH} from './common/constants'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  equitiesRef: AngularFirestoreCollection<Equity>;
  // itemsRef: AngularFirestoreCollection<Item>;
  // optionsRef: AngularFirestoreCollection<Option>;
  
  constructor(db: AngularFirestore) {
    this.equitiesRef = db.collection(EQUITIES_DB_PATH);
    // this.itemsRef = db.collection(ITEMS_DB_PATH);
    // this.optionsRef = db.collection(OPTIONS_DB_PATH);
       
  }

  getAllEquities(): AngularFirestoreCollection<Equity> {
    return this.equitiesRef;

  }

  createEquity(equity: Equity) {
    return this.equitiesRef.add({...equity});
  }

  updateEquity(id: string, data: any): Promise<void> {
    return this.equitiesRef.doc(id).update(data);
  }

  deleteEquity(id: string): Promise<void> {
    return this.equitiesRef.doc(id).delete();
  }



}
