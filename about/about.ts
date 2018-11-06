import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConsultPage } from '../consult/consult';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  GoToCon(){
    this.navCtrl.push(ConsultPage)
  }

}
