import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IonicPage, Platform} from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {Diagnostic} from '@ionic-native/diagnostic';

@IonicPage()
@Component({
  selector: 'page-dataService',
  templateUrl: 'dataService.html',
  providers: [
    Geolocation, HttpClient, Platform, Diagnostic, LocationAccuracy
  ]
})
@Injectable()
export class DataService {

  constructor(private http: HttpClient,
              public platform: Platform,
              public geo: Geolocation,
              public diagnostic: Diagnostic,
              public locationAccuracy: LocationAccuracy
  ) {}

  getUserPosition() {
    return new Promise(resolve => {
      const HIGH_ACCURACY = 'high_accuracy';
      if (this.platform.is('cordova')) {
        this.platform.ready().then(() => {
          this.diagnostic.isLocationEnabled().then(enabled => {
            if (enabled) {
              if (this.platform.is('android')) {
                this.diagnostic.getLocationMode().then(locationMode => {
                  if (locationMode === HIGH_ACCURACY) {
                    this.geo.getCurrentPosition({timeout: 30000, maximumAge: 0, enableHighAccuracy: true}).then(pos => {
                      resolve({
                        coords: {
                          latitude: pos.coords.latitude,
                          longitude: pos.coords.longitude
                        }
                      });
                    }).catch(error => resolve(error));
                  } else {
                    this.askForHighAccuracy().then(available => {
                      if (available) {
                        this.getUserPosition().then(a => resolve(a), e => resolve(e));
                      }
                    }, error => resolve(error));
                  }
                });
              } else {
                this.geo.getCurrentPosition({timeout: 30000, maximumAge: 0, enableHighAccuracy: true}).then(pos => {
                  resolve({
                    coords: {
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude
                    }
                  });
                }).catch(error => resolve(error));
              }
            } else {
              this.locationAccuracy.request(1).then(result => {
                if (result) {
                  this.getUserPosition().then(result => resolve(result), error => resolve(error));
                }
              }, error => {
                resolve(error)
              });
            }
          }, error => {
            resolve(error)
          });
        });
      } else {
        resolve('Cordova is not available');
      }
    });
  }

  askForHighAccuracy(): Promise<Geoposition> {
    return new Promise(resolve => {
      this.locationAccuracy
        .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
        this.geo.getCurrentPosition({timeout: 30000}).then(
          position => {
            resolve(position);
          }, error => resolve(error)
        );
      }, error => resolve(error));
    });
  }

}
