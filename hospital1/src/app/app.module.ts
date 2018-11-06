import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ConnectionListernerProvider } from '../providers/connection-listerner/connection-listerner';
import { GoogleMapHandlerProvider } from '../providers/google-map-handler/google-map-handler';
import { LocationHandlerProvider } from '../providers/location-handler/location-handler';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpClientModule,
    SharedModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    LocationAccuracy,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectionListernerProvider,
    GoogleMapHandlerProvider,
    LocationHandlerProvider,
    Network,
    Geolocation,
    SocialSharing,
    BrowserTab,
    InAppBrowser,
  ]
})
export class AppModule {}
