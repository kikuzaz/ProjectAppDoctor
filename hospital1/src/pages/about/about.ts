import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public browserTab:BrowserTab,public iab:InAppBrowser) {

  }

 showAuthorSocialMediaPage(url){

    
  this.browserTab.isAvailable()
  .then((isAvailable: boolean) => {

    if (isAvailable) {
      
      this.browserTab.openUrl(url).then(success => {

        if (success) {
        }
      });

    } else {
      
      this.iab.create(url, "_system", "location=true");


    }

  });
}
}
