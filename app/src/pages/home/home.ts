import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import { LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public loadingCtrl: LoadingController) {
    const loader = this.loadingCtrl.create({
      content: "Ładowanie...",
      duration: 2000,
    });
    loader.present();
  }
}
