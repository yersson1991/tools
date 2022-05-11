import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStorePageRoutingModule } from './form-store-routing.module';

import { FormStorePage } from './form-store.page';
import { HereMapComponent } from './components/here-map/here-map.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormStorePageRoutingModule
  ],
  declarations: [FormStorePage, HereMapComponent]
})
export class FormStorePageModule {}
