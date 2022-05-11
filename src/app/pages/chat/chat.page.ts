import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { User } from 'src/app/interfaces/user';
import { AppLanguageService } from 'src/app/shared/services/app-language.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userReceiver: any;
  user: User;
  messages: any = [];
  messageCtrl: FormControl;
  writeMessageText: string;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private dataStorageService: DataStorageService,
    private chatService: ChatService,
    private appLanguageService: AppLanguageService
  ) {
    this.messageCtrl = new FormControl('', Validators.required);
  }

  async ngOnInit(): Promise<void> {
    const userLocal = await this.dataStorageService.getUser();
    this.user = userLocal;
    this.writeMessageText = 'escibe aqui tu mensaje';

    const idReceiver = this.router.snapshot.paramMap.get('idReceiver');
    const sub = this.userService.getUser(idReceiver).subscribe(
      user => {
        this.userReceiver = user;
        this.chatService.getConversation(this.user.uid, idReceiver).subscribe(
          c => {
            if (c) {
              this.messages = c.messages;
            }
          }
        )
        sub.unsubscribe();
      }
    );
  }

  async sendMessage() {
    this.chatService.sendMessage(this.user, this.userReceiver, this.messageCtrl.value);
    this.messageCtrl.setValue('');
  }
}
