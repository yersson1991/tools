import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { LoginPage } from './login.page';
import { ForgotPassModalComponent } from '../forgot-pass/forgot-pass-modal';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPage
            },
        ]),
        ReactiveFormsModule,
    ],
    declarations: [LoginPage, ForgotPassModalComponent]
})
export class LoginPageModule {}
