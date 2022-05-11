import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPage } from './customer.page';
import { CustomerPageRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule
  ],
  declarations: [CustomerPage]
})
export class CustomerPageModule {}
