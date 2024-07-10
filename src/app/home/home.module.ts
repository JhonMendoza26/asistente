import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProspectosRoutingModule } from '@app/prospectos/prospectos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    IonicModule,
    HomeRoutingModule,
    ProspectosRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
