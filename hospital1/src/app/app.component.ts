import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  rootParams: any;

  menuItems: any[] = [
    {
      name: '',
      page: 'TabsPage',
      
    },
    {
      name: 'Favorite Locations',
      page: 'FavoritPlacePage',
     
    },
    {
      name: 'About',
      page: 'AboutPage',
      
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
   
    this.rootPage = this.menuItems[0].page;
    this.rootParams = this.menuItems[0].params;

    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#C2185B');
      splashScreen.hide();
    });
  }

  
  openPage(page) {
    this.nav.push(page.page);
    // this.nav.setRoot(page.page, page.params);
  }
}
