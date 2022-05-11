import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AllyPageRoutingModule } from './ally-routing.module';

import { IonicModule } from '@ionic/angular';

import { AllyPage } from './ally.page';
import { StorePageModule } from '../store/store.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllyPageRoutingModule,
    StorePageModule
  ],
  declarations: [AllyPage]
})
export class AllyPageModule {}
