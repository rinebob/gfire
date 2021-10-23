import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { ItemsComponent } from './items/items.component';
// import { FirebaseService } from './firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
