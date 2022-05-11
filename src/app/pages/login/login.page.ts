import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ModalController } from "@ionic/angular";
import { ForgotPassModalComponent } from "../forgot-pass/forgot-pass-modal";

import { AuthService } from '../../shared/services/auth.service';

const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup;
  
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController
  ) {
    this.buildForm();
  }

  emailAndPasswordLogin(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const { email, pass } = this.form.value;
      this.authService.emailAndPasswordLogin(email, pass);
    } else {
      this.form.markAllAsTouched();
    }
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }

  facebookLogin(): void {
    this.authService.facebookLogin();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(regexValidateEmail)]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailField(): AbstractControl {
    return this.form.get('email');
  }

  get passwordField(): AbstractControl {
    return this.form.get('pass');
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ForgotPassModalComponent,
      componentProps: {
        'modalTitle': 'Recuperar contraseña',
        'modalCloseBtnText': 'Cerrar',
        'modalSendBtnText': 'Enviar',
        'emailText': 'email',
        'emailInvalidErrorText': 'email invalido',
        'requiredFieldErrorText': 'texto requerido',
        'messageSendText': 'Se envio con exito'
      }
    });
    return modal.present();
  }
}
