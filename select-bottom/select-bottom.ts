import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bottom1Page } from '../bottom1/bottom1';
import { Bottom2Page } from '../bottom2/bottom2';
import { Bottom3Page } from '../bottom3/bottom3';
import { Bottom4Page } from '../bottom4/bottom4';
import { Bottom5Page } from '../bottom5/bottom5';
import { Bottom6Page } from '../bottom6/bottom6';
import { Bottom7Page } from '../bottom7/bottom7';
import { Bottom8Page } from '../bottom8/bottom8';

/**
 * Generated class for the SelectBottomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-bottom',
  templateUrl: 'select-bottom.html',
})
export class SelectBottomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectBottomPage');
  }

  gotoBottom1(){
    this.navCtrl.push(Bottom1Page);
  }

  gotoBottom2(){
    this.navCtrl.push(Bottom2Page);
  }

  gotoBottom3(){
    this.navCtrl.push(Bottom3Page);
  }

  gotoBottom4(){
    this.navCtrl.push(Bottom4Page);
  }

  gotoBottom5(){
    this.navCtrl.push(Bottom5Page);
  }

  gotoBottom6(){
    this.navCtrl.push(Bottom6Page);
  }

  gotoBottom7(){
    this.navCtrl.push(Bottom7Page);
  }

  gotoBottom8(){
    this.navCtrl.push(Bottom8Page);
  }

}
