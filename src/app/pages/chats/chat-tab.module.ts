import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatTabPage } from './chat-tab.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatTabPage }]),
    SharedModule
  ],
  declarations: [ChatTabPage]
})
export class ChatTabModule { }