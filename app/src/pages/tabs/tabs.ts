import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {Tab1Root, Tab2Root, Tab3Root, Tab4Root} from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;

  tab1Title = 'Strona Główna';
  tab2Title = "Lista";
  tab3Title = "Mapa";
  tab4Title = "Ustawienia";

  tabBadge = 15;

  constructor(public navCtrl: NavController) {
  }
}
