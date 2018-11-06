import { Component } from '@angular/core';
import { IonicPage,NavController} from 'ionic-angular';
import { ConnectionListernerProvider } from '../../providers/connection-listerner/connection-listerner';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  hospital = "HospitalPage";
  pharmacy = "PharmacyPage";

  selected_place:any;
  rating:any=0;
  showFooter:boolean=true; //show and hide footer using the Fab Icon
  constructor(public connectionService:ConnectionListernerProvider, public navCtlr:NavController) {
     this.connectionService.selectedPlaceObserve$.subscribe(place=>{

       this.selected_place=place;

       if(this.selected_place)
       this.rating=this.selected_place.rating;
       //this.rating=4;
     })
  }


   showPlaceDetailsPage(place:any){
      
    this.navCtlr.push('PlaceDetailsPage',{place:place});

   }

 showDirectionPage(place:any){
   
   this.navCtlr.push('PlaceDirectionPage',{direction:place});
    
}


   handleFabEvent(){

       this.showFooter=!this.showFooter;
   }
}
