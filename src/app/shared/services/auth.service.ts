import { Injectable } from "@angular/core";
import { Platform, NavController } from "@ionic/angular";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { DataStorageService } from './data-storage.service';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Provider } from '../../interfaces/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  private static TAG: string = "AuthServiceError";
  errorMessage: string;

  constructor(
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private gPlus: GooglePlus,
    private facebook: Facebook,
    private navCtrl: NavController,
    private dataStorageService: DataStorageService,
    private userService: UserService
  ) {
    this.user = this.afAuth.authState;
  }

  googleLogin(): void {
    if (this.platform.is('hybrid')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gPlusUser = await this.gPlus.login({
        'webClientId': environment.clientWebGoogleID,
        'offline': true,
        'scopes': 'profile email'
      });
      const firebaseUser = await this.afAuth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
      );
      const sub = this.userService.getUser(firebaseUser.user.uid)
        .subscribe(
          async u => await this.validateUserFirestore(u, firebaseUser.user, sub, Provider.Google)
        );
    } catch(err) {
      console.error(`${AuthService.TAG}/nativeGoogleLogin: ${err}`);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const firebaseUser = await this.afAuth.signInWithPopup(provider);
      const sub = this.userService.getUser(firebaseUser.user.uid)
        .subscribe(
          async u => await this.validateUserFirestore(u, firebaseUser.user, sub, Provider.Google) 
        );
    } catch(err) {
      console.error(`${AuthService.TAG}/webGoogleLogin: ${err}`);
    }
  }

  facebookLogin(): void {
    if (this.platform.is('hybrid')) {
      this.nativeFacebookLogin();
    } else {
      this.webFacebookLogin();
    }
  }

  async nativeFacebookLogin() {
    try {
      const facebookUser = await this.facebook.login(['public_profile', 'email']);
      const firebaseUser = await this.afAuth.signInWithCredential(
        firebase.auth.FacebookAuthProvider.credential(facebookUser.authResponse.accessToken)
      );
      const sub = this.userService.getUser(firebaseUser.user.uid)
      .subscribe(
        async u => await this.validateUserFirestore(u, firebaseUser.user, sub, Provider.Facebook)
      );
    } catch(err) {
      console.error(`${AuthService.TAG}/nativeFacebookLogin: ${err}`);
    }
  }

  async webFacebookLogin() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const firebaseUser = await this.afAuth.signInWithPopup(provider);
      const sub = this.userService.getUser(firebaseUser.user.uid)
        .subscribe(
          async u => await this.validateUserFirestore(u, firebaseUser.user, sub, Provider.Facebook)
        );
    } catch(err) {
      console.error(`${AuthService.TAG}/webFacebookLogin: ${err}`);
    }
  }

  async emailAndPasswordLogin(email: string, password: string) {
    try {
      const firebaseUser = await this.afAuth.signInWithEmailAndPassword(email, password);
      const sub = this.userService.getUser(firebaseUser.user.uid)
        .subscribe(
          async u => {
            await this.dataStorageService.saveUser(u);
            sub.unsubscribe();
            this.navCtrl.navigateRoot(`/${u.selectedRole}`);
          }
        );
    } catch(err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        this.errorMessage = 'Usuario o contraseña inválida';
      } else if (err.code === 'auth/too-many-requests') {
        this.errorMessage = 'Error, se supero el limite de intentos';
      } else {
        console.error(`${AuthService.TAG}/emailAndPasswordLogin: ${err}`);
      }
    }
  }

  async createUser(firstName: string, lastName: string, email: string, pass: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, pass);
      const subscription = this.user.subscribe(async firebaseUser => {
        if (firebaseUser) {
          const displayName = `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`;
          await firebaseUser.updateProfile({ displayName  });
          const { uid, photoURL } = firebaseUser;
          const user = await this.userService.saveUser({
            uid,
            displayName,
            photoURL,
          } as firebase.User, Provider.Email);
          //await firebaseUser.sendEmailVerification();
          subscription.unsubscribe();
          this.navCtrl.navigateRoot(`/${user.selectedRole}`);
        } else {
          console.error(`${AuthService.TAG}, updating user`);
          subscription.unsubscribe();
        }
      });
    } catch(err) {
      if (err.code === 'auth/email-already-in-use') {
        const texts = await this.dataStorageService.getTextsApplication();
        this.errorMessage = 'El email se encuentra en uso';
      }
      console.error(`${AuthService.TAG}/createUser: ${err}`);
    }
  }

  async logout(): Promise<void> {
    try {
      const user = await this.dataStorageService.getUser();
      await this.afAuth.signOut();
      if (this.platform.is('hybrid')) {
        if (user.provider === Provider.Google) {
          this.gPlus.logout();
        } 
        if (user.provider === Provider.Facebook) {
          this.facebook.logout();
        }
      }
      this.navCtrl.navigateRoot('/login');
    } catch(err) {
      console.error(`${AuthService.TAG}/logout: ${err}`);
    }
  }

  private async validateUserFirestore(u: User, firebaseUser: firebase.User, sub: Subscription, provider: string) {
    if (u) {
      await this.dataStorageService.saveUser(u);
      sub.unsubscribe();
      this.navCtrl.navigateRoot(`/${u.selectedRole}`);
    } else {
      const {
        uid,
        displayName,
        photoURL
      } = firebaseUser;
      const user = await this.userService.saveUser({ 
        uid,
        displayName,
        photoURL,
      } as firebase.User, provider);
      await this.dataStorageService.saveUser(user);
      sub.unsubscribe();
      this.navCtrl.navigateRoot(`/${user.selectedRole}`);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch(err) {
      console.error(`${AuthService.TAG}/forgotPassword: ${err}`);
    }
  }
}