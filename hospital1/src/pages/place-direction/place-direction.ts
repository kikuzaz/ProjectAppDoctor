import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectionListernerProvider } from '../../providers/connection-listerner/connection-listerner';
import { LocationHandlerProvider } from '../../providers/location-handler/location-handler';


declare var google;
@IonicPage()
@Component({
  selector: 'page-place-direction',
  templateUrl: 'place-direction.html',
})

export class PlaceDirectionPage {

 
  map_initialised:boolean=false;
  apiKey: string = "AIzaSyDbwyDFeOYr590MG4DiSMyZ1eKKnbCRV_c"; //API KEY
  map:any;
  destination_name:string="";
  distance:string="";
  place_directions={
    place_origin:null,
    place_destination:null,
    place_travel_mode:"WALKING",
 }
 @ViewChild('map') mapDiv: ElementRef;
 @ViewChild('directionsPanel') directionsPanel: ElementRef;
  constructor(public location_handler:LocationHandlerProvider,public navCtrl: NavController, public navParams: NavParams, public connectionListerner:ConnectionListernerProvider) {
      
        let data=this.navParams.get('direction');
        if(data){
            
           this.place_directions.place_origin=data.current_location;
           this.place_directions.place_destination=data;
           this.destination_name=data.place_name;
           this.distance=data.place_distance;
         
        }
     
  }

  ionViewDidLoad() {
        this.loadGoogleMap();
  }

 loadGoogleMap(){

  this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      if (this.connectionListerner.isOnline()) {
 
 
          window['mapInit'] = () => {
            this.startDestinationNavigation();
            this.enableMap();    
          }
        this.map_initialised=true;
        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(script);
      
      }
    }
    else {

      if (this.connectionListerner.isOnline()) {
      
        this.startDestinationNavigation() ;
        this.enableMap();
      }
      else {
       
        this.disableMap();
      }
    }
 }

 disableMap() {
    
  let title="Offline Status";
  let message="You are currently offline.Please connect to the internet to continue";
  this.location_handler.showSimpleAlertDialog(title,message);
}

enableMap() {
  
  this.location_handler.showToastMessage("You are currently online","bottom",3000);
}


addConnectivityListeners() {

  let onOnline = () => {

    setTimeout(() => {
      if (typeof google == "undefined" || typeof google.maps == "undefined" ) {
     
           if(!this.map_initialised){
             //reintialised the map again on the dom
             this.loadGoogleMap();
           }
      } else {

        if (this.map_initialised) {
          this.startDestinationNavigation();
          this.enableMap();
        }

        
      }
    }, 2000);

  };


  let onOffline = () => {
    this.disableMap();
  };


  document.addEventListener('online', onOnline, false);
  document.addEventListener('offline', onOffline, false);

}


  startDestinationNavigation(){
   

    let place_origin: any=this.place_directions.place_origin;
    let place_destination :any=this.place_directions.place_destination;
    
    
    let origin_latLng = new google.maps.LatLng(place_origin.lat, place_origin.lng);
    let destination_latLng = new google.maps.LatLng(place_destination.latitude, place_destination.longitude);
    

    let origin_latlng={
      lat:place_origin.lat,
      lng:place_origin.lng
    }

    let destination_latlng={
      lat:place_destination.latitude,
      lng:place_destination.longitude
    }


    let mapOptions = {
      center: origin_latLng,
      zoom: 15,
      zoomControl: false,
      fullscreenControl: false,
      gestureHandling: 'none',
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

     
    this.map = new google.maps.Map(this.mapDiv.nativeElement, mapOptions);


    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
        origin: origin_latLng,
        destination: destination_latLng,
        travelMode: google.maps.TravelMode[this.place_directions.place_travel_mode]
    },( (res, status) => {

        if(status == google.maps.DirectionsStatus.OK){
           
            directionsDisplay.setDirections(res);


            var _route = res.routes[0].legs[0]; 
		        //set markers for the origin and destination on the map
    let origin_marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: _route.start_location,
      label:{
        text:"C",
        color:"white",
      },
      icon:{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: .6,
        scale: 20,
        strokeColor: 'white',
        strokeWeight: .5
}
    });

    let destination_marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: _route.end_location,
      label:{
        text:"D",
        color:"white",
      },
      icon:{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .6,
        scale: 20,
        strokeColor: 'white',
        strokeWeight: .5
}
    }); 
        } else {
            console.warn(status);
        }

    }).bind(this));

  }
}
