import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import leaflet from 'leaflet';

import {TabsPage} from '../tabs/tabs';
import {Api, Settings} from "../../providers";

import {DataService} from '../dataService/dataService';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [DataService],
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  isInitialized: boolean;
  currentPosition: any;
  range = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tabsPage: TabsPage,
              public settings: Settings,
              public api: Api,
              public geo: DataService) {
    this.settings.getValue('range').then((res) => {
      this.range = (res / 1000);
    });
    this.isInitialized = false;
  }

  ionViewDidEnter() {
    if (!this.isInitialized) {
      this.loadMap();
      this.isInitialized = true;
    }
  }

  loadMap() {
    this.map = leaflet.map("map");

    leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      animate: true,
    }).addTo(this.map);

    var greenIcon = new leaflet.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });


    this.map.locate({
      setView: true,
      minZoom: 18,
    }).on('locationfound', (e) => {

      var radius = e.accuracy / 2;

      leaflet.marker(e.latlng, {icon: greenIcon}).addTo(this.map).bindPopup("To twoja pozycja").openPopup();

      leaflet.circle(e.latlng, radius).addTo(this.map);
      //alert(this.geo.getUserPosition());

      console.log(e.latlng);

      this.map.fitBounds(e.target.getBounds());
      this.currentPosition = e.target.getBounds().getCenter();
      //leaflet.marker([50.06778, 19.907097]).addTo(this.map);
      //alert(e.target.getBounds());
    });
  }

  collect() {
    this.tabsPage.tabBadge = 17;

    this.settings.getValue('range').then((res) => {
      this.range = res / 1000;
    });

    var obj = {
      name: "John", surname: "Kowalski"
    };
    console.log(JSON.stringify(obj));

    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          (new leaflet.LayerGroup()).clearLayers();

          for(let dat in xhr.response) {
            //leaflet.marker([dat.longitude, dat.latitude]).addTo(this.map);
          }
          console.log(xhr.response);
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.open("GET", "http://192.168.43.253:8000/restaurant" + '?longitude=' + this.currentPosition.lng.toString() + '&latitude=' + this.currentPosition.lat.toString() + '&radius=' + this.range.toString(), true);



    xhr.send();
  }
}
