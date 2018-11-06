import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationHandlerProvider } from '../../providers/location-handler/location-handler';
import { ConnectionListernerProvider } from '../../providers/connection-listerner/connection-listerner';



declare var google;
@IonicPage()
@Component({
  selector: 'page-pharmacy',
  templateUrl: 'pharmacy.html',
})

export class PharmacyPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  current_location: any;
  apiKey: string = "AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw";
  place_view_option: string = "map";
  places: any; //Hold an array of nearby services to the user current direction
  current_location_object: any;
  show_map: boolean = true;
  current_window = null;
  offline_dialog:boolean=false;
  constructor(public navCtrl: NavController, public location_handler: LocationHandlerProvider, public navParams: NavParams, public geolocation: Geolocation, public connectivityService: ConnectionListernerProvider) {
  }

  ionViewDidEnter() {
    //start loadinf animation
    this.location_handler.showLoader("กำลังโหลดร้านขายยาที่อยู่ใกล้คุณ....");
    this.renderNearbyServices();

  }

  segmentChanged(event_object) {

    console.log(event_object);
    if (event_object._value === "list") {
      this.show_map = false;
    } else if (event_object._value === "map") {
      this.show_map = true;
    }
  }

  renderNearbyServices() {

    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
           script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&libraries=places&callback=mapInit';
         } else {
           script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
         }

         document.body.appendChild(script);

      }
    }
    else {

      if (this.connectivityService.isOnline()) {

        this.initMap();
        this.enableMap();
      }
      else {

        this.disableMap();
      }
    }
  }


  initMap() {
    this.mapInitialised = true;
    let current: any;

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 16,
        fullscreenControl: false,
        gestureHandling: 'auto',
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.current_location = latLng;  //set user current latitude and longitude to the current context to be used later

      current = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }


      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: current,
        label: {
          text: "C",
          color: "white",
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'blue',
          fillOpacity: .8,
          scale: 20,
          strokeColor: 'white',
          strokeWeight: .5
        }
      });

 
      let infoWindow = new google.maps.InfoWindow;

      infoWindow.setPosition(current);
      infoWindow.setContent('คุณอยู่ที่นี่.');
      infoWindow.open(this.map);
      this.map.setCenter(current);


      this.getNearbyActivities("pharmacy", this.current_location, current);
    });

    this.current_location_object = current;
  }

  disableMap() {
/*
    if(this.offline_dialog){

    }else{
      this.offline_dialog=true;
      let title = "Offline Status";
      let message = "You are currently offline.Please connect to the internet to continue";
      this.location_handler.showSimpleAlertDialog(title, message);
    }
    // this.location_handler.showSimpleAlertDialog(title,message);
    */
  }

  enableMap() {

    this.location_handler.showToastMessage("You are currently online", "bottom", 3000);
  }

  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {

          this.renderNearbyServices();
        } else {

          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }

  getNearbyActivities(place_type: string, user_current_location: any, current_location): void {

    let request = {
      location: user_current_location,
      radius: '1000',
      type: [place_type]
    };

    let user_location: any = current_location;
    console.log(current_location);

    let nearby_places: any = []; //hold the list of nearby places
    let place_service = new google.maps.places.PlacesService(this.map);
    let map_id = this.map;
    let window = this.current_window;

    let self = this;
    place_service.nearbySearch(request, (function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {

        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          let photo = place.icon;
          if (place.photos) {
            let photos_list = place.photos;
            photo = photos_list[0].getUrl({ 'maxWidth': 35, 'maxHeight': 35 })
          }


          let marker = new google.maps.Marker({
            map: map_id,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location,
            title: place.name,
            label: {
              text: "P",
              color: "white",
            },

          });


          let state_restuarant = "";
          if (place.opening_hours) {

            if (place.opening_hours.open_now) {

              state_restuarant = "Service is currently on and still open";
            } else {
              state_restuarant = "Service has currently closed for the day";
            }
          } else {
            state_restuarant = "Service has currently closed for the day";
          }

          let lng = place.geometry.location.lng();
          let lat = place.geometry.location.lat();

          //calculate the distance of this place from that of the user
          let units = 'm';
          let earthRadius = {
            miles: 3958.8,
            m: 6378137
          };

          let R = earthRadius[units];
          let lat1 = user_location.lat;
          let lon1 = user_location.lng;
          let lat2 = lat;
          let lon2 = lng;

          let dLat = (lat2 - lat1) * (Math.PI / 180);
          let dLon = (lon2 - lon1) * (Math.PI / 180);;
          let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1) * (Math.PI / 180)) * Math.cos((lat2) * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          let d = Math.round((R * c));
          //toFixed(2);

       var placeDetails = {
        placeId: place.place_id
      };
       let selected_place=place;
       let place_rating=0;
       let place_formatted_address="";
       let place_formatted_number="";
       let place_url="";
       let place_website="";
       let place_photos=[];
  
       let getPlaceDetailService = new google.maps.places.PlacesService(map_id);
       getPlaceDetailService.getDetails(placeDetails, (function(place, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            
          place_formatted_number=place.international_phone_number;
          place_formatted_address=place.formatted_address;
          place_url=place.url;
          place_website=place.place_website;
          place_photos=place.photos;

            let place_object = {
              latitude: lat,
              longitude: lng,
              place_name: selected_place.name,
              place_vicinity: selected_place.vicinity,
              place_url: photo,
              place_status: state_restuarant,
              place_distance:d,
              current_location:current_location,
              rating:place.rating,
              place_website:place_website,
              place_map_url:place_url,
              place_address:place_formatted_address,
              place_formatted_number:place_formatted_number,
              place_photos:place.photos,
            };
            nearby_places.push(place_object);

          google.maps.event.addListener(marker, 'mouseover', () => {
    
              this.setSelectedPlace(place_object);
            });
    
            google.maps.event.addListener(marker, 'click', () => {
          
              this.setSelectedPlace(place_object);  
         
            });
           
        }else{
          console.log("Unable to get place details "+ selected_place)
        }
   
      }).bind(this));
      
        }

      }

    }).bind(this));
    console.log(nearby_places);

    this.places = nearby_places;

    this.location_handler.closeLoader();

    this.location_handler.calculateNearbyPlacesByApplyHaversine(nearby_places,this.current_location_object);

  }

  setSelectedPlace(place: any) {

    if (place != null)
      this.connectivityService.setSelectedPlace(place);
  }
}


