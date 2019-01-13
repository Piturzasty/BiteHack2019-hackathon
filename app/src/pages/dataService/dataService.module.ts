import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DataService } from './dataService';

@NgModule({
  declarations: [
    DataService,
  ],
  imports: [
    IonicPageModule.forChild(DataService),
    TranslateModule.forChild()
  ],
  exports: [
    DataService
  ]
})
export class SearchPageModule { }
