import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SelectHeadPage } from '../select-head/select-head';
import { SelectBodyPage } from '../select-body/select-body';
import { SelectBottomPage } from '../select-bottom/select-bottom';
import { SelectGeneralPage } from '../select-general/select-general';
/**
 * Generated class for the SymptomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-symptom',
  templateUrl: 'symptom.html',
})
export class SymptomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SymptomPage');
  }

  GotoSelectHeadPage(){
    this.navCtrl.push(SelectHeadPage);
  }

  GotoSelectBodyPage(){
    this.navCtrl.push(SelectBodyPage);
  }

  GotoSelectBottomPage(){
    this.navCtrl.push(SelectBottomPage);
  }

  GotoSelectGeneralPage(){
    this.navCtrl.push(SelectGeneralPage);
  }

}
