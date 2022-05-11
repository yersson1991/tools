import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) {
    this.buildForm();
  }

  createUser(): void {
    if (this.form.valid) {
      this.authService.createUser(
        this.firstNameField.value,
        this.lastNameField.value,
        this.emailField.value,
        this.passField.value
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(regexValidateEmail)]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get firstNameField(): AbstractControl {
    return this.form.get('firstName');
  }

  get lastNameField(): AbstractControl {
    return this.form.get('lastName');
  }

  get emailField(): AbstractControl {
    return this.form.get('email');

  } 
  
  get passField(): AbstractControl {
    return this.form.get('pass');
  }
}
