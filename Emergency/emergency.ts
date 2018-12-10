import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectFirstAidPage } from '../select-first-aid/select-first-aid';
import { MapPage } from '../map/map';
import { SelectFirstAidPageModule } from '../select-first-aid/select-first-aid.module';

@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage {

  constructor(public navCtrl: NavController) {

  }

  GotoSelectFirstAid(){
    this.navCtrl.push(SelectFirstAidPage);
  }

  GotoMap(){
    this.navCtrl.push(MapPage);
  }

}
