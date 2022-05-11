import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProductPageRoutingModule } from './form-product-routing.module';

import { FormProductPage } from './form-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormProductPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormProductPage]
})
export class FormProductPageModule {}
