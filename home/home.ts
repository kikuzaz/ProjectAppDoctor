import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectHeadPage } from '../select-head/select-head';
import { SelectBodyPage } from '../select-body/select-body';
import { SelectBottomPage } from '../select-bottom/select-bottom';
import { SelectGeneralPage } from '../select-general/select-general';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
