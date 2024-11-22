import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {environment} from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,    HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({"projectId":"aplimoviles-e42c2","appId":"1:349601688361:web:93df32e16c7bfefda86538","storageBucket":"aplimoviles-e42c2.firebasestorage.app","apiKey":"AIzaSyDMJQqJJERfazZ1ymbJopMQmECUSDvNuuw","authDomain":"aplimoviles-e42c2.firebaseapp.com","messagingSenderId":"349601688361","measurementId":"G-Y9X3NMYK3Q"})), provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
