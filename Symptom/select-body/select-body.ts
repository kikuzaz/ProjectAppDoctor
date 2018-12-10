import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Body1Page } from '../body1/body1';
import { Body2Page } from '../body2/body2';
import { Body3Page } from '../body3/body3';
import { Body4Page } from '../body4/body4';
import { Body5Page } from '../body5/body5';
import { Body6Page } from '../body6/body6';
import { Body7Page } from '../body7/body7';
import { Body8Page } from '../body8/body8';
import { Body9Page } from '../body9/body9';
import { Body10Page } from '../body10/body10';

/**
 * Generated class for the SelectBodyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-body',
  templateUrl: 'select-body.html',
})
export class SelectBodyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectBodyPage');
  }

  gotoBody1(){
    this.navCtrl.push(Body1Page);
  }

  gotoBody2(){
    this.navCtrl.push(Body2Page);
  }

  gotoBody3(){
    this.navCtrl.push(Body3Page);
  }

  gotoBody4(){
    this.navCtrl.push(Body4Page);
  }

  gotoBody5(){
    this.navCtrl.push(Body5Page);
  }

  gotoBody6(){
    this.navCtrl.push(Body6Page);
  }

  gotoBody7(){
    this.navCtrl.push(Body7Page);
  }

  gotoBody8(){
    this.navCtrl.push(Body8Page);
  }

  gotoBody9(){
    this.navCtrl.push(Body9Page);
  }
  gotoBody10(){
    this.navCtrl.push(Body10Page);
  }

}
