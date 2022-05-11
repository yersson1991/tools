import { Component, OnInit } from "@angular/core";
import { PopoverController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Role } from 'src/app/interfaces/enums';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  templateUrl: './options-popover.html'
})
export class OptionsPopover implements OnInit {
  toRole: string;
  user: User;

  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private navCtrl: NavController,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    this.user = await this.dataStorageService.getUser();

    if (this.user.selectedRole === Role.Customer) {
      this.toRole = 'Aliado';
    } else {
      this.toRole = 'usuario';
    }
  }

  async changeRole(): Promise<void> {
    if (this.user.selectedRole === Role.Ally) {
      const updatedUser: User = {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        roles: this.user.roles,
        selectedRole: Role.Customer,
        provider: this.user.provider
      }
      await this.dataStorageService.saveUser(updatedUser);
      await this.userService.updateSelectedRole(this.user.uid, Role.Customer);
      this.navCtrl.navigateRoot(`${Role.Customer}`);
    }

    if (this.user.selectedRole === Role.Customer) {
      const updatedUser: User = {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        roles: this.user.roles,
        selectedRole: Role.Ally,
        provider: this.user.provider
      }
      await this.dataStorageService.saveUser(updatedUser);
      await this.userService.updateSelectedRole(this.user.uid, Role.Ally);
      this.navCtrl.navigateRoot(`${Role.Ally}`);
    }
    await this.popoverCtrl.dismiss();
  }

  logout(): void {
    this.authService.logout();
    this.popoverCtrl.dismiss();
  }
}