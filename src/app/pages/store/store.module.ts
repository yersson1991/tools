import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StorePage } from './store.page';
import { FormStorePageModule } from '../form-store/form-store.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: StorePage }])
  ],
  declarations: [StorePage],
  exports: [StorePage]
})
export class StorePageModule {}
