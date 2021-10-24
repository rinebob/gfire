import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { ItemsComponent } from './items/items.component';
import { SymbolFormComponent } from './symbol-form/symbol-form.component';
import { SymbolListComponent } from './symbol-list/symbol-list.component';
import { SymbolDetailComponent } from './symbol-detail/symbol-detail.component';
// import { FirebaseService } from './firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    SymbolFormComponent,
    SymbolListComponent,
    SymbolDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => { 
    //   const firestore = getFirestore();
    //   connectFirestoreEmulator(firestore, 'localhost', 8080);
    //   enableIndexedDbPersistence(firestore);
    //   return firestore;

    // }),
    
    // // AngularFireModule.initializeApp(environment.firebase, 'gFire'),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  // providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
