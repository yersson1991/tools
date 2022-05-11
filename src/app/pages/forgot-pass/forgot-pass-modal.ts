import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';

const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-pass-modal',
  templateUrl: './forgot-pass-modal.html',
  styleUrls: ['./forgot-pass-modal.scss']
})
export class ForgotPassModalComponent {
  formModal: FormGroup;
  modalTitle: string;
  modalCloseBtnText: string;
  modalSendBtnText: string;
  emailText: string;
  emailInvalidErrorText: string;
  requiredFieldErrorText: string;
  messageSendText: string;

  constructor(
    navParams: NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.modalTitle =  navParams.get('modalTitleText');
    this.modalCloseBtnText = navParams.get('modalCloseBtnText');
    this.modalSendBtnText = navParams.get('modalSendBtnText');
    this.emailText = navParams.get('emailText');
    this.emailInvalidErrorText = navParams.get('emailInvalidErrorText');
    this.requiredFieldErrorText = navParams.get('requiredFieldErrorText');
    this.messageSendText = navParams.get('messageSendText');

    this.buildFormModal();
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  private buildFormModal(): void {
    this.formModal = this.formBuilder.group({
      emailModal: ['', [Validators.required, Validators.pattern(regexValidateEmail)]]
    });
  }

  get emailModalField(): AbstractControl {
    return this.formModal.get('emailModal');
  } 

  async sendEmail(event: Event) {
    event.preventDefault();
    if (this.formModal.valid) {
      await this.authService.forgotPassword(this.emailModalField.value);
      await this.presentAlert();
      this.dismiss();
    } else {
      this.formModal.markAllAsTouched();
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: this.messageSendText,
      buttons: [this.modalCloseBtnText]
    });

    await alert.present();
  }
}
