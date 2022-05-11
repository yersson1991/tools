import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { OptionsPopover } from '../options-popover/options-popover';
import { ChatService } from 'src/app/shared/services/chat.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.page.html',
  styleUrls: ['./chat-tab.page.scss']
})
export class ChatTabPage implements OnInit {
  chats: any; 

  constructor(
    private popoverCtrl: PopoverController,
    private chatService: ChatService,
    private dataStorageService: DataStorageService,
    private navCtrl: NavController
  ) { }

  async ngOnInit(): Promise<void> {
    const user = await this.dataStorageService.getUser();
    this.chatService.getAllChatByUser(user.uid).subscribe(
      chats => {
        if (chats) {
          console.log(12, chats);
          this.chats = chats;
        }
      }
    );
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }

  openChat(idUser: string) {
    this.navCtrl.navigateForward(`/chat/${idUser}`);
  }
}