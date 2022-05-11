import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterPage
      }
    ]),
    ReactiveFormsModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
