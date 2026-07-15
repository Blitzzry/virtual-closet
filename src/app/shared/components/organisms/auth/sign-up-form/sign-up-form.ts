import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../../atoms/icon/icons';

@Component({
  selector: 'app-sign-up-form',
  imports: [FormsModule, Icon],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  @Input() userRegistered: boolean = false;
  @Output() closeWindow: any;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = "";
  signUp() {
  }
  signIn() {
  }
}
