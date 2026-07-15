import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../../atoms/icon/icons';

@Component({
  selector: 'app-log-in-form',
  imports: [FormsModule, Icon],
  templateUrl: './log-in-form.html',
  styleUrl: './log-in-form.css',
})
export class LogInForm {
  @Input() userRegistered: boolean = false;
  @Output() closeWindow: any;
  rememberMe: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = "";
  signUp() {
  }
  signIn() {
  }
}
