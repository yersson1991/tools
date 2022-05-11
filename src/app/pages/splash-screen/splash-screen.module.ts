import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SplashScreenPage } from './splash-screen.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SplashScreenPage
      }
    ]),
  ],
  declarations: [SplashScreenPage]
})
export class SplashScreenPageModule {}
