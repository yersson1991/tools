import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsPopover } from '../options-popover/options-popover';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppLanguageService } from 'src/app/shared/services/app-language.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user: User;

  constructor(
    private popoverCtrl: PopoverController,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private appLanguageService: AppLanguageService
  ) { }

  async ngOnInit(): Promise<void> {
    const user = await this.dataStorageService.getUser();
    this.user = user;
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }

  logout(): void {
    this.authService.logout();
  }
}
