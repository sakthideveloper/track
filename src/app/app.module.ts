import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CarProvider } from '../providers/car/car';
import { PickupPubSubProvider } from '../providers/pickup-pub-sub/pickup-pub-sub';
import { SimulateProvider } from '../providers/simulate/simulate';

import { Geolocation } from '@ionic-native/geolocation';
import { ComponentsModule } from '../components/components.module';
import { BackgroundMode } from '@ionic-native/background-mode';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarProvider,
    PickupPubSubProvider,
    SimulateProvider,
    BackgroundMode
  ]
})
export class AppModule {}
