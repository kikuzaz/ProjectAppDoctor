import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisLoginPage } from './regis-login';

@NgModule({
  declarations: [
    RegisLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisLoginPage),
  ],
})
export class RegisLoginPageModule {}
