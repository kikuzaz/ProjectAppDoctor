import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SymptomPage } from './symptom';

@NgModule({
  declarations: [
    SymptomPage,
  ],
  imports: [
    IonicPageModule.forChild(SymptomPage),
  ],
})
export class SymptomPageModule {}
