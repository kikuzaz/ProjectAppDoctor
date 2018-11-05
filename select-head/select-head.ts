import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Head1Page } from '../head1/head1';
/**
 * Generated class for the SelectHeadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-head',
  templateUrl: 'select-head.html',
})
export class SelectHeadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectHeadPage');
  }

  gotoHead1(){
    this.navCtrl.push(Head1Page);
  }

}
